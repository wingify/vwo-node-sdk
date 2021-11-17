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

const EventDispatcher = require('../../lib/utils/EventDispatcherUtil');
let getProperties = {
  account_id: 12344,
  tags: JSON.stringify({ u: { random: 'random' } }),
  experiment_id: 12,
  combination: 23
};

let postProperties = {
  en: 'vwo_syncVisitorProp',
  a: 123
};

let payload = {
  d: {
    visitor: {
      props: {
        vwo_fs_environment: '1234rfvcewqw'
      }
    }
  }
};

describe('EventDispatcher', () => {
  describe('test impression', () => {
    test('handleGetResponse: when error is returned', () => {
      let response = EventDispatcher.handleGetResponse({}, 'error is received', { endPoint: 'https://vwo.com' });
      expect(response).toBe(false);
    });

    test('handleGetResponse: when impression is successfully sent for push api', () => {
      let response = EventDispatcher.handleGetResponse(getProperties, null, { endPoint: 'https://vwo.com/push' });
      expect(response).toBe(true);
    });

    test('handleGetResponse: when impression is successfully sent for other than push api', () => {
      let response = EventDispatcher.handleGetResponse(getProperties, null, { endPoint: 'https://vwo.com/' });
      expect(response).toBe(true);
    });
    test('handlePostResponse: when error is returned', () => {
      let response = EventDispatcher.handlePostResponse({}, {}, { endPoint: 'https://vwo.com' });
      expect(response).toBe(false);
    });

    test('handlePostResponse: when impression is successfully sent for vwo_syncVisitorProp event', () => {
      let response = EventDispatcher.handlePostResponse(postProperties, payload);
      expect(response).toBe(true);
    });

    test('handlePostResponse: when impression is successfully sent for vwo_variationShown event', () => {
      postProperties.en = 'random';
      let response = EventDispatcher.handlePostResponse(postProperties, payload);
      expect(response).toBe(true);
    });
  });
});
