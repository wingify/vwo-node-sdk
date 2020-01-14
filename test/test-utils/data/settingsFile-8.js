module.exports = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 218,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 33.3333,
          segments: {
            or: [
              {
                custom_variable: {
                  safari: 'true'
                }
              }
            ]
          }
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 33.3333,
          segments: {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          }
        },
        {
          id: 3,
          name: 'Variation-2',
          changes: {},
          weight: 33.3333,
          segments: {
            or: [
              {
                custom_variable: {
                  chrome: 'false'
                }
              }
            ]
          }
        }
      ],
      id: 235,
      percentTraffic: 100,
      key: 'DEV_TEST_6',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      isForcedVariationEnabled: true,

      segments: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  contains_vwo: 'wildcard(*vwo*)'
                }
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    or: [
                      {
                        and: [
                          {
                            or: [
                              {
                                and: [
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          regex_for_all_letters: 'regex(^[A-z]+$)'
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          regex_for_capital_letters: 'regex(^[A-Z]+$)'
                                        }
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_for_small_letters: 'regex(^[a-z]+$)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                custom_variable: {
                                  regex_for_no_zeros: 'regex(^[1-9]+$)'
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        or: [
                          {
                            custom_variable: {
                              regex_for_zeros: 'regex(^[0]+$)'
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          regex_real_number: 'regex(^\\d+(\\.\\d+)?)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          this_is_regex: 'regex(this\\s+is\\s+text)'
                        }
                      }
                    ]
                  },
                  {
                    and: [
                      {
                        and: [
                          {
                            or: [
                              {
                                custom_variable: {
                                  starts_with: 'wildcard(starts_with_variable*)'
                                }
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                custom_variable: {
                                  contains: 'wildcard(*contains_variable*)'
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        or: [
                          {
                            not: {
                              or: [
                                {
                                  custom_variable: {
                                    is_not_equal_to: 'is_not_equal_to_variable'
                                  }
                                }
                              ]
                            }
                          },
                          {
                            or: [
                              {
                                custom_variable: {
                                  is_equal_to: 'equal_to_variable'
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ],
  accountId: 888888,
  version: 1
};
