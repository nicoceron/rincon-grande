import { mkdir, writeFile, access } from 'node:fs/promises';
import { basename, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mediaDir = join(root, 'public/assets/media');
const fontsDir = join(root, 'public/assets/fonts');

const media = [
  'https://framerusercontent.com/assets/LGqTc4kjWcR9vrmnI7ICgwcK7c.mp4',
  'https://framerusercontent.com/images/aWW9meKNe5PnkBcRb0ucRuo688.webp?width=2400&height=1350',
  'https://framerusercontent.com/assets/jXevRX7EQwFseJ7djNws4zu1daM.mp4',
  'https://framerusercontent.com/images/ye5iOdi8OTDZhwGrQSZ0kuUDI.webp?width=2400&height=1350',
  'https://framerusercontent.com/images/WNN0TqL1kayfzoDpYYHovVHpQE.webp?scale-down-to=2048&width=2400&height=1600',
  'https://framerusercontent.com/images/BtKWGJR3kw9YES7JR3ksB7U9TA.webp?width=1600&height=2400',
  'https://framerusercontent.com/images/Y1c8j9ExgwOZJYx3l0tvfJwCM84.webp?width=1600&height=2400',
  'https://framerusercontent.com/assets/beWHozkLbhf55jlaSBtRqYXEQ.mp4',
  'https://framerusercontent.com/images/jjnWNCUKQVwXhsmQpcuytPh1WFg.jpg?scale-down-to=1024&width=2048&height=1080',
  'https://framerusercontent.com/images/qNSGhwJVKcpXUZPgIzMjIp6AYXE.webp?width=2400&height=1349',
  'https://framerusercontent.com/images/3QOiS0dhhczJ0lD7d3S8G2cMBlE.webp?scale-down-to=2048&width=1600&height=2400',
  'https://framerusercontent.com/images/MyoZhomLijmbkkTtuMHk0uiLxNA.webp?scale-down-to=2048&width=2400&height=1598',
  'https://framerusercontent.com/images/rbHy0w4VSqtJ82AlF0184UUi8.webp?scale-down-to=2048&width=2400&height=1600',
  'https://framerusercontent.com/images/stq9B48TBbWNYUTiJG9wmySzFGs.webp?scale-down-to=2048&width=2400&height=1600',
  'https://framerusercontent.com/images/VHEwMdZ6xllcrUL4Tser2PKLHk.webp?width=1600&height=2400',
  'https://framerusercontent.com/images/QbmL2f9jkX5CjVUG9F97LVHgBg.webp?width=1599&height=2400',
  'https://framerusercontent.com/images/tZ2Ol1bWlRsbIL29NQISrMY7v3I.webp?width=1601&height=2400',
  'https://framerusercontent.com/images/caPlFqrim8er8OYBAktsRm8HNEM.webp?width=1599&height=2400',
  'https://framerusercontent.com/images/U8qvv4WN6R6xtYcln4X3LFdesQ.webp?width=1600&height=2400',
  'https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg?arrow=left',
  'https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg?arrow=right',
  'https://framerusercontent.com/images/UjTvfWpDMhdPUVIkBpKs4M2pPT8.webp?scale-down-to=2048&width=2400&height=1599',
  'https://framerusercontent.com/images/IPA56m5CXyF7Z4hoin3C7VOdg.jpg',
  'https://framerusercontent.com/images/ItEgNLdjMjEIl3NgsQ0f3Ez4YfE.png',
];

const fonts = [
  'https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwRGFWfOw.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwYGFWfOw.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwTGFWfOw.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwSGFWfOw.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQIl5na-1Q.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQInpna-1Q.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQIlZna-1Q.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQIlJna-1Q.woff2',
  'https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQImpna.woff2',
  'https://fonts.gstatic.com/s/geist/v4/gyBhhwUxId8gMGYQMKR3pzfaWI_RwuM4mJPby1QNtA.woff2',
  'https://fonts.gstatic.com/s/fragmentmono/v6/4iCr6K5wfMRRjxp0DA6-2CLnN4FNh4UI_1U.woff2',
  'https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2',
  'https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2',
  'https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2',
  'https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2',
  'https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2',
  'https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2',
  'https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2',
  'https://framerusercontent.com/assets/mkY5Sgyq51ik0AMrSBwhm9DJg.woff2',
  'https://framerusercontent.com/assets/X5hj6qzcHUYv7h1390c8Rhm6550.woff2',
  'https://framerusercontent.com/assets/gQhNpS3tN86g8RcVKYUUaKt2oMQ.woff2',
  'https://framerusercontent.com/assets/cugnVhSraaRyANCaUtI5FV17wk.woff2',
  'https://framerusercontent.com/assets/5HcVoGak8k5agFJSaKa4floXVu0.woff2',
  'https://framerusercontent.com/assets/rZ5DdENNqIdFTIyQQiP5isO7M.woff2',
  'https://framerusercontent.com/assets/P2Bw01CtL0b9wqygO0sSVogWbo.woff2',
  'https://framerusercontent.com/assets/05KsVHGDmqXSBXM4yRZ65P8i0s.woff2',
  'https://framerusercontent.com/assets/ky8ovPukK4dJ1Pxq74qGhOqCYI.woff2',
  'https://framerusercontent.com/assets/vvNSqIj42qeQ2bvCRBIWKHscrc.woff2',
  'https://framerusercontent.com/assets/3ZmXbBKToJifDV9gwcifVd1tEY.woff2',
  'https://framerusercontent.com/assets/FNfhX3dt4ChuLJq2PwdlxHO7PU.woff2',
  'https://framerusercontent.com/assets/gcnfba68tfm7qAyrWRCf9r34jg.woff2',
  'https://framerusercontent.com/assets/efTfQcBJ53kM2pB1hezSZ3RDUFs.woff2',
  'https://framerusercontent.com/assets/H89BbHkbHDzlxZzxi8uPzTsp90.woff2',
  'https://framerusercontent.com/assets/u6gJwDuwB143kpNK1T1MDKDWkMc.woff2',
  'https://framerusercontent.com/assets/43sJ6MfOPh1LCJt46OvyDuSbA6o.woff2',
  'https://framerusercontent.com/assets/wccHG0r4gBDAIRhfHiOlq6oEkqw.woff2',
  'https://framerusercontent.com/assets/WZ367JPwf9bRW6LdTHN8rXgSjw.woff2',
  'https://framerusercontent.com/assets/ia3uin3hQWqDrVloC1zEtYHWw.woff2',
  'https://framerusercontent.com/assets/2A4Xx7CngadFGlVV4xrO06OBHY.woff2',
  'https://framerusercontent.com/assets/mYcqTSergLb16PdbJJQMl9ebYm4.woff2',
  'https://framerusercontent.com/assets/ZRl8AlxwsX1m7xS1eJCiSPbztg.woff2',
  'https://framerusercontent.com/assets/nhSQpBRqFmXNUBY2p5SENQ8NplQ.woff2',
  'https://framerusercontent.com/assets/DYHjxG0qXjopUuruoacfl5SA.woff2',
  'https://framerusercontent.com/assets/s7NH6sl7w4NU984r5hcmo1tPSYo.woff2',
  'https://framerusercontent.com/assets/7lw0VWkeXrGYJT05oB3DsFy8BaY.woff2',
  'https://framerusercontent.com/assets/wx5nfqEgOXnxuFaxB0Mn9OhmcZA.woff2',
  'https://framerusercontent.com/assets/DpPBYI0sL4fYLgAkX8KXOPVt7c.woff2',
  'https://framerusercontent.com/assets/4RAEQdEOrcnDkhHiiCbJOw92Lk.woff2',
  'https://framerusercontent.com/assets/1K3W8DizY3v4emK8Mb08YHxTbs.woff2',
  'https://framerusercontent.com/assets/tUSCtfYVM1I1IchuyCwz9gDdQ.woff2',
  'https://framerusercontent.com/assets/VgYFWiwsAC5OYxAycRXXvhze58.woff2',
  'https://framerusercontent.com/assets/syRNPWzAMIrcJ3wIlPIP43KjQs.woff2',
  'https://framerusercontent.com/assets/GIryZETIX4IFypco5pYZONKhJIo.woff2',
  'https://framerusercontent.com/assets/CfMzU8w2e7tHgF4T4rATMPuWosA.woff2',
  'https://framerusercontent.com/assets/867QObYax8ANsfX4TGEVU9YiCM.woff2',
  'https://framerusercontent.com/assets/Oyn2ZbENFdnW7mt2Lzjk1h9Zb9k.woff2',
  'https://framerusercontent.com/assets/cdAe8hgZ1cMyLu9g005pAW3xMo.woff2',
  'https://framerusercontent.com/assets/DOfvtmE1UplCq161m6Hj8CSQYg.woff2',
  'https://framerusercontent.com/assets/pKRFNWFoZl77qYCAIp84lN1h944.woff2',
  'https://framerusercontent.com/assets/tKtBcDnBMevsEEJKdNGhhkLzYo.woff2',
  'https://framerusercontent.com/third-party-assets/fontshare/wf/NWBQYJIM7GCZ5XWD7D26ARB3VDY55ZRT/K63EV2KZIGKLE7RANQ2U42S6SVHU5RJ7/X6XYTKIVDUW7GZTZPZNN4EUM5KH54KHF.woff2',
  'https://framerusercontent.com/third-party-assets/fontshare/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2',
  'https://framerusercontent.com/third-party-assets/fontshare/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2',
  'https://framerusercontent.com/third-party-assets/fontshare/wf/CDEBEFT2R7XKNGXSBBLZGMY4MMHZG75P/HEVKDGQCYDZ7Z6CDVR2ZQGBCTUD6ZARH/BKWEE3VKGTFABE37K2DTH625VUSN2N35.woff2',
  'https://framerusercontent.com/third-party-assets/fontshare/wf/MPIFA4B3XXRNY2MJDGP6GOOOAF6EOCLO/W5E4ZFYPJ3V6JKMBGHB6YMITK6EWS2XA/QOMBWPST76ICDYF6WOBS7SQ7RBT67QW2.woff2',
  'https://framerusercontent.com/assets/95cWY6HmOBgWIRt2c9cUACfWTo.woff2',
];

const filenameFor = (url) => basename(new URL(url).pathname);

async function download(url, directory) {
  const filename = filenameFor(url);
  const destination = join(directory, filename);
  try {
    await access(destination);
    return { url, filename, skipped: true };
  } catch {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    return { url, filename, skipped: false };
  }
}

await mkdir(mediaDir, { recursive: true });
await mkdir(fontsDir, { recursive: true });

const jobs = [
  ...media.map((url) => download(url, mediaDir)),
  ...fonts.map((url) => download(url, fontsDir)),
];
const results = await Promise.allSettled(jobs);
const failures = results.filter((result) => result.status === 'rejected');
if (failures.length) {
  for (const failure of failures) console.error(failure.reason?.message ?? failure.reason);
  process.exitCode = 1;
}

const completed = results.filter((result) => result.status === 'fulfilled').length;
console.log(`Localized ${completed}/${results.length} assets (${media.length} media, ${fonts.length} fonts).`);
