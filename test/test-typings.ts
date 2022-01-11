/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
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

import * as vwoSDK from 'vwo-node-sdk';

let settings: object = vwoSDK.getSettingsFile('accountId', 'apikey');

let vwoLog: vwoSDK.VWOLog = {
  log(level: any, message: string) {}
};

let logging: vwoSDK.VWOLogger = {
  level: vwoSDK.LogLevelEnum.DEBUG,
  logger: vwoLog
};

let batchEvents: vwoSDK.VWOBatchConfig = {
  eventsPerRequest: 200,
  requestTimeInterval: 234,
  flushCallback(error: any, events: any) {}
};

let userStorage: vwoSDK.VWOUserStorageConfig = {
  get(userId: string, campaignKey: string): Record<string, any> {
    return {};
  },

  set(data: Record<string, any>): void {}
};

let vwoLaunchOptions: vwoSDK.VWOLaunchConfig = {
  settingsFile: settings,
  isDevelopmentMode: true,
  shouldTrackReturningUser: false,
  pollingInterval: 23000,
  logging: logging,
  batchEvents: batchEvents,
  userStorageService: userStorage,
  goalTypeToTrack: vwoSDK.GoalTypeEnum.REVENUE
};

let apiOptions: vwoSDK.VWOApiOptions = {
  customVariables: {
    browser: 'chrome'
  },
  variationTargetingVariables: {
    os: 'macOS'
  },
  shouldTrackReturningUser: true,
  metaData: {
    userId: 'userId'
  },
  userStorageData: {}
};

let trackOptions: vwoSDK.VWOTrackGoalOptions = {
  revenueValue: 20,
  goalTypeToTrack: vwoSDK.GoalTypeEnum.REVENUE
};

let vwoInstance: vwoSDK.vwoInstance = vwoSDK.launch(vwoLaunchOptions);

let variationName: string | null = vwoInstance.activate('campaignKey', 'userId', apiOptions);

variationName = vwoInstance.getVariationName('campaignKey', 'userId', apiOptions);

let isFeatureEnabled: boolean = vwoInstance.isFeatureEnabled('campaignKey', 'userId', apiOptions);

let variableValue: any = vwoInstance.getFeatureVariableValue('campaignKey', 'variableKey', 'userId', apiOptions);

let isGoalTracked: Record<string, boolean> = vwoInstance.track(
  'campaignKey',
  'userId',
  'goalIdentifier',
  Object.assign({}, trackOptions, apiOptions)
);

let optOut = vwoInstance.setOptOut();

let isPostDimensionPushed = vwoInstance.push('tagKey', 'tagValue', 'userId');
vwoInstance.push({'a': 'a'}, 'userId');

///flush batch events manually

vwoInstance.flushEvents().then((value: Record<string, any>) => {});

//fetch updated settings file manually

vwoInstance.getAndUpdateSettingsFile('accountId', 'apiKey').then((settings: object) => {});
