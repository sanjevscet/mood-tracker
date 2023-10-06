import _ from "lodash";
import { MoodData as data } from "./MoodData"

import moment from "moment";

const moodIndex: any = {
    "Delighted": 100,
    "Happy": 80,
    "Neutral": 60,
    "Confused": 40,
    "Sad": 20
};

const users = [
    "sachin.sachdeva@ukg.com",
    "rahul.rana@ukg.com",
    "subhash.gairola@ukg.com",
    "sanjeev.s.kumar@ukg.com",
    "divyam.agarwal@ukg.com",
    "pooja.kuthi@ukg.com",
    "rajat.awasthi@ukg.com",
    "manish.agarwal@ukg.com"
];

const moods = ["Delighted", "Happy", "Neutral", "Confused", "Sad"];



export const generateDummyData = () => {
    const dummyData: any = [];

    users.forEach(user => {
        for (let date = '2023-01-01'; date <= '2023-09-30'; date = moment(date).add(1, 'days').format('YYYY-MM-DD')) {
            const mood = _.sample(moods);
            dummyData.push({
                username: user,
                mood: mood,
                date: date
            });
        }
    });

    return dummyData;
};

export const generateDummyDataV2 = (dates: string[]) => {
    const dummyData: any = [];

    users.forEach(user => {
        for (let i = 0; i < dates.length - 1; i++) {
            // for (let date = '2023-01-01'; date <= '2023-09-30'; date = moment(date).add(1, 'days').format('YYYY-MM-DD')) {
            const mood = _.sample(moods);
            dummyData.push({
                username: user,
                mood: mood,
                date: dates[i]
            });
        }
    });

    return dummyData;
};


export const uniqueMoods = _.uniqBy(data, 'mood').map(item => item.mood);

export const getMoodDataByDay = (period = "last-week") => {

    let dates = [];
    if (period === "last-week") {
        const today = moment();
        const lastWeek = moment().subtract(7, 'days');

        while (lastWeek.isBefore(today)) {
            dates.push(lastWeek.format('YYYY-MM-DD'));
            lastWeek.add(1, 'day');
        }
    }

    else if (period === "last-month") {
        const today = moment();
        const lastWeek = moment().subtract(30, 'days');

        while (lastWeek.isBefore(today)) {
            dates.push(lastWeek.format('YYYY-MM-DD'));
            lastWeek.add(1, 'day');
        }
    }
    else {
        const today = moment();
        const lastWeek = moment().subtract(90, 'days');

        while (lastWeek.isBefore(today)) {
            dates.push(lastWeek.format('YYYY-MM-DD'));
            lastWeek.add(1, 'day');
        }
    }

    const data = generateDummyDataV2(dates);

    const sortedData = _.sortBy(data, 'date');

    // Step 2: Group data by date
    const groupedData = _.groupBy(sortedData, 'date');

    // Step 3: Calculate mood counts for each date
    const result = _.mapValues(groupedData, group => {
        return _.countBy(group, 'mood');
    });

    const moodIndex: any = {
        "Delighted": 100,
        "Happy": 80,
        "Neutral": 60,
        "Confused": 40,
        "Sad": 20
    };


    const calculateHappyIndex = (moodCounts: any) => {
        const totalMoodCount = _.sum(Object.values(moodCounts));
        return _.sum(_.map(moodCounts, (count, mood) => moodIndex[mood] * count)) / totalMoodCount;
    };

    const happyIndexByDate = _.mapValues(result, moodCounts => {
        return calculateHappyIndex(moodCounts);
    });

    const labels = _.keys(happyIndexByDate)
    const values = _.values(happyIndexByDate)

    console.log(happyIndexByDate);

    console.log(JSON.stringify(result))

    return ({ labels, values })
}

export const uniqueEmployee = _.uniqBy(data, 'username').map(item => item.username);

console.log(uniqueEmployee)

export const getMoodDataByDayForUser = (username: string) => {


    const moodIndex: any = {
        "Delighted": 96,
        "Happy": 80,
        "Neutral": 60,
        "Confused": 40,
        "Sad": 20
    };
    const sortedData = _.sortBy(data, entry => moment(entry.date, 'YYYY-MM-DD'));

    // Step 1: Filter by username "sanjeev.s.kumar@ukg.com"
    const filteredData = _.filter(sortedData, { username });

    // Step 2: Group data by date
    const groupedData = _.groupBy(filteredData, 'date');

    // Step 3: Calculate Happy Index for each date
    const happyIndexByDate = _.mapValues(groupedData, group => {
        return _.sumBy(group, entry => moodIndex[entry.mood]);
    });


    const labels = _.keys(happyIndexByDate)
    const values = _.values(happyIndexByDate)

    return ({ labels, values })
}


console.log(uniqueMoods);









