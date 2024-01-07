import PocketBase from 'pocketbase';

const url = 'https://knightly-insights.pockethost.io/'
const pb = new PocketBase(url)
pb.autoCancellation(false)

export { pb }