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

export const uniqueMoods = _.uniqBy(data, 'mood').map(item => item.mood);

export const getMoodDataByDay = () => {
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

export const getMoodDataByDayForUser = (username: string) => {

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
