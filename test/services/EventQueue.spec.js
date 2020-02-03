/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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

const EventQueue = require('../../lib/services/EventQueue');
const VWO = require('../../lib/VWO');

const mockFn = jest.fn();

const logger = { log: mockFn };

describe('EventQueue', () => {
  describe('method: process', () => {
    const queue = new EventQueue();
    test("shouldn't enqueue anything in developmentMode", () => {
      queue.process({ isDevelopmentMode: true }, {}, new VWO({ logger }));
      expect(queue.queue.length).toBe(0);
    });
  });

  // describe('method: enqueue', () => {
  //   const queue = new EventQueue();
  //   test("should enqueue in the queue", () => {
  //     queue.enqueue({}, new VWO({logger}));
  //     queue.running = true;
  //     expect(queue.queue.length).toBe(1);
  //   });
  // });
});
