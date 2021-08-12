/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const bucketValues = [
  {
    user: 'Ashley',
    bucketValue: 4986
  },
  {
    user: 'Bill',
    bucketValue: 2379
  },
  {
    user: 'Chris',
    bucketValue: 9285
  },
  {
    user: 'Dominic',
    bucketValue: 7505
  },
  {
    user: 'Emma',
    bucketValue: 4394
  },
  {
    user: 'Faizan',
    bucketValue: 4218
  },
  {
    user: 'Gimmy',
    bucketValue: 9572
  },
  {
    user: 'Harry',
    bucketValue: 2511
  },
  {
    user: 'Ian',
    bucketValue: 4715
  },
  {
    user: 'John',
    bucketValue: 216
  },
  {
    user: 'King',
    bucketValue: 8198
  },
  {
    user: 'Lisa',
    bucketValue: 394
  },
  {
    user: 'Mona',
    bucketValue: 2599
  },
  {
    user: 'Nina',
    bucketValue: 6932
  },
  {
    user: 'Olivia',
    bucketValue: 3203
  },
  {
    user: 'Pete',
    bucketValue: 6457
  },
  {
    user: 'Queen',
    bucketValue: 5379
  },
  {
    user: 'Robert',
    bucketValue: 2679
  },
  {
    user: 'Sarah',
    bucketValue: 163
  },
  {
    user: 'Tierra',
    bucketValue: 7022
  },
  {
    user: 'Una',
    bucketValue: 1545
  },
  {
    user: 'Varun',
    bucketValue: 4716
  },
  {
    user: 'Will',
    bucketValue: 9731
  },
  {
    user: 'Xin',
    bucketValue: 4342
  },
  {
    user: 'You',
    bucketValue: 5321
  },
  {
    user: 'Zeba',
    bucketValue: 3730
  }
];

const seedBucketValue = [
  { user: 'Ashley', bucketValue: 4986, campaign: { id: 1, isBucketingSeedEnabled: false } },
  { user: 'Ashley', bucketValue: 4539, campaign: { id: 1, isBucketingSeedEnabled: true } },
  { user: 'Bill', bucketValue: 2379, campaign: { id: 11, isBucketingSeedEnabled: false } },
  { user: 'Bill', bucketValue: 7425, campaign: { id: 11, isBucketingSeedEnabled: true } },
  { user: 'Chris', bucketValue: 9285, campaign: { id: 132, isBucketingSeedEnabled: false } },
  { user: 'Chris', bucketValue: 2691, campaign: { id: 132, isBucketingSeedEnabled: true } },
  { user: 'Dominic', bucketValue: 7505, campaign: { id: 21, isBucketingSeedEnabled: false } },
  { user: 'Dominic', bucketValue: 1025, campaign: { id: 21, isBucketingSeedEnabled: true } },
  { user: 'Emma', bucketValue: 4394, campaign: { id: 21, isBucketingSeedEnabled: false } },
  { user: 'Emma', bucketValue: 5169, campaign: { id: 21, isBucketingSeedEnabled: true } },
  { user: 'Faizan', bucketValue: 4218, campaign: { id: 13, isBucketingSeedEnabled: false } },
  { user: 'Faizan', bucketValue: 2322, campaign: { id: 13, isBucketingSeedEnabled: true } },
  { user: 'Gimmy', bucketValue: 9572, campaign: { id: 14, isBucketingSeedEnabled: false } },
  { user: 'Gimmy', bucketValue: 1802, campaign: { id: 14, isBucketingSeedEnabled: true } },
  { user: 'Harry', bucketValue: 2511, campaign: { id: 54, isBucketingSeedEnabled: false } },
  { user: 'Harry', bucketValue: 6380, campaign: { id: 54, isBucketingSeedEnabled: true } },
  { user: 'Ian', bucketValue: 4715, campaign: { id: 98, isBucketingSeedEnabled: false } },
  { user: 'Ian', bucketValue: 150, campaign: { id: 98, isBucketingSeedEnabled: true } },
  { user: 'John', bucketValue: 216, campaign: { id: 14, isBucketingSeedEnabled: false } },
  { user: 'John', bucketValue: 2176, campaign: { id: 14, isBucketingSeedEnabled: true } },
  { user: 'King', bucketValue: 8198, campaign: { id: 331, isBucketingSeedEnabled: false } },
  { user: 'King', bucketValue: 2269, campaign: { id: 331, isBucketingSeedEnabled: true } },
  { user: 'Lisa', bucketValue: 394, campaign: { id: 14, isBucketingSeedEnabled: false } },
  { user: 'Lisa', bucketValue: 5223, campaign: { id: 14, isBucketingSeedEnabled: true } },
  { user: 'Mona', bucketValue: 2599, campaign: { id: 15, isBucketingSeedEnabled: false } },
  { user: 'Mona', bucketValue: 1722, campaign: { id: 15, isBucketingSeedEnabled: true } },
  { user: 'Nina', bucketValue: 6932, campaign: { id: 241, isBucketingSeedEnabled: false } },
  { user: 'Nina', bucketValue: 271, campaign: { id: 241, isBucketingSeedEnabled: true } },
  { user: 'Olivia', bucketValue: 3203, campaign: { id: 93, isBucketingSeedEnabled: false } },
  { user: 'Olivia', bucketValue: 7638, campaign: { id: 93, isBucketingSeedEnabled: true } },
  { user: 'Pete', bucketValue: 6457, campaign: { id: 87, isBucketingSeedEnabled: false } },
  { user: 'Pete', bucketValue: 9957, campaign: { id: 87, isBucketingSeedEnabled: true } },
  { user: 'Queen', bucketValue: 5379, campaign: { id: 34, isBucketingSeedEnabled: false } },
  { user: 'Queen', bucketValue: 9242, campaign: { id: 34, isBucketingSeedEnabled: true } },
  { user: 'Robert', bucketValue: 2679, campaign: { id: 45, isBucketingSeedEnabled: false } },
  { user: 'Robert', bucketValue: 3515, campaign: { id: 45, isBucketingSeedEnabled: true } },
  { user: 'Sarah', bucketValue: 163, campaign: { id: 54, isBucketingSeedEnabled: false } },
  { user: 'Sarah', bucketValue: 4499, campaign: { id: 54, isBucketingSeedEnabled: true } },
  { user: 'Tierra', bucketValue: 7022, campaign: { id: 566, isBucketingSeedEnabled: false } },
  { user: 'Tierra', bucketValue: 431, campaign: { id: 566, isBucketingSeedEnabled: true } },
  { user: 'Una', bucketValue: 1545, campaign: { id: 545, isBucketingSeedEnabled: false } },
  { user: 'Una', bucketValue: 8964, campaign: { id: 545, isBucketingSeedEnabled: true } },
  { user: 'Varun', bucketValue: 4716, campaign: { id: 34, isBucketingSeedEnabled: false } },
  { user: 'Varun', bucketValue: 9556, campaign: { id: 34, isBucketingSeedEnabled: true } },
  { user: 'Will', bucketValue: 9731, campaign: { id: 431, isBucketingSeedEnabled: false } },
  { user: 'Will', bucketValue: 7363, campaign: { id: 431, isBucketingSeedEnabled: true } },
  { user: 'Xin', bucketValue: 4342, campaign: { id: 566, isBucketingSeedEnabled: false } },
  { user: 'Xin', bucketValue: 7431, campaign: { id: 566, isBucketingSeedEnabled: true } },
  { user: 'You', bucketValue: 5321, campaign: { id: 65, isBucketingSeedEnabled: false } },
  { user: 'You', bucketValue: 2899, campaign: { id: 65, isBucketingSeedEnabled: true } },
  { user: 'Zeba', bucketValue: 3730, campaign: { id: 109, isBucketingSeedEnabled: false } },
  { user: 'Zeba', bucketValue: 9441, campaign: { id: 109, isBucketingSeedEnabled: true } }
];

module.exports = {
  bucketValues,
  seedBucketValue
};
