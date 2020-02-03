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

module.exports = {
  and_operator: {
    single_and_operator_matching: {
      dsl: {
        and: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    single_and_operator_case_mismatch: {
      dsl: {
        and: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Eq_Value'
      }
    },
    multiple_and_operator2: {
      dsl: {
        and: [
          {
            and: [
              {
                and: [
                  {
                    and: [
                      {
                        and: [
                          {
                            custom_variable: {
                              eq: 'eq_value'
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
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_and_operator_with_all_incorrect_correct_values: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'wrong',
        reg: 'wrong'
      }
    },
    multiple_and_operator_with_single_correct_value2: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'wrong',
        reg: 'myregexxxxxx'
      }
    },
    multiple_and_operator_with_all_correct_values: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value',
        reg: 'myregexxxxxx'
      }
    },
    single_and_operator_mismatch: {
      dsl: {
        and: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'n_eq_value'
      }
    },
    multiple_and_operator_with_single_correct_value: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value',
        reg: 'wrong'
      }
    }
  },
  case_insensitive_equality_operand: {
    exact_match_with_special_characters: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
      }
    },
    float_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.456)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    numeric_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 12
      }
    },
    float_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.456)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123.4567
      }
    },
    incorrect_key: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        neq: 'something'
      }
    },
    incorrect_key_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(zzsomethingzz)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'i'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(e)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'Something'
      }
    },
    exact_match_with_spaces: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(nice to see you. will    YOU be   my        Friend?)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'nice to see you. will    YOU be   my        Friend?'
      }
    },
    stringified_float: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: '123.456000000'
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(E)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'e'
      }
    },
    char_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(E)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(true)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    boolean_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(true)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.0
      }
    },
    mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'notsomething'
      }
    },
    numeric_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123
      }
    },
    exact_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    part_of_text: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(zzsomethingzz)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    exact_match_with_upper_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
      }
    },
    null_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: null
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(false)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    no_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: ''
      }
    },
    missingkey_value: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {}
    },
    stringified_float3: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.4560000)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    },
    stringified_float2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.0)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123
      }
    },
    case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'SOMETHINg'
      }
    },
    float_data_type_extra_decimal_zeros: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    },
    boolean_data_type3: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(True)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    boolean_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(false)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'lower(123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    }
  },
  complex_and_ors: {
    complex_dsl_1: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 1
      }
    },
    complex_dsl_2: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 1,
        neq: 'not_eq_value'
      }
    },
    complex_dsl_3: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 1,
        contain: 'zzzzzzmy_contain_valzzzzz',
        eq: 1,
        start_with: 'm1y_1sta1rt_with_val',
        neq: false
      }
    },
    complex_dsl_4: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 1,
        contain: 'my_ contain _val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: null
      }
    },
    complex_dsl_5: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my_ contain _val',
        eq: 'eq__value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 123
      }
    },
    complex_dsl_6: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my$contain$val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 'not_matching'
      }
    }
  },
  complex_dsl_1: {
    matching_contains_with_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 1,
        contain: 'zzzzzzmy_contain_valzzzzz',
        eq: 1,
        start_with: 'm1y_1sta1rt_with_val',
        neq: false
      }
    },
    matching_both_start_with_and_not_equal_to_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 'not_eq_value'
      }
    },
    matching_not_equal_to_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 1,
        neq: 'not_eq_value'
      }
    },
    matching_start_with_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 1
      }
    },
    matching_regex_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my_ contain _val',
        eq: 'eq__value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 123
      }
    },
    matching_both_equal_to_and_regex_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my$contain$val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 'not_matching'
      }
    },
    matching_equal_to_value: {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  {
                    or: [
                      {
                        custom_variable: {
                          start_with: 'wildcard(my_start_with_val*)'
                        }
                      }
                    ]
                  },
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            neq: 'not_eq_value'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      contain: 'wildcard(*my_contain_val*)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      eq: 'eq_value'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    custom_variable: {
                      reg: 'regex(myregex+)'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 1,
        contain: 'my_ contain _val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: null
      }
    }
  },
  complex_dsl_2: {
    false4: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_starts_with: 'v owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovovwo',
        vwo_contains: 'vwo'
      }
    },
    false1: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwovwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovw',
        vwo_contains: 'vwo'
      }
    },
    false3: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   isvwo',
        vwovwovwo: 'vwovwovw',
        vwo_contains: 'vwo'
      }
    },
    false2: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwo',
        vwo_contains: 'vwo'
      }
    },
    true4: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vw'
      }
    },
    true1: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vwo'
      }
    },
    true3: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwovwo',
        regex_vwo: 'this   isvwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vwo'
      }
    },
    true2: {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            notvwo: 'notvwo'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwovwovwo: 'regex(vwovwovwo)'
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
                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            vwo_not_equal_to: 'owv'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_equal_to: 'vwo'
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
                          vwo_starts_with: 'wildcard(owv vwo*)'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwo',
        vwo_contains: 'vwo'
      }
    }
  },
  complex_dsl_3: {
    false5: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 12231023,
        regex_for_all_letters: 'dsfASF6',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: '0001000',
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    false4: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'is_not_equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    false6: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 12231023,
        regex_for_all_letters: 'dsfASF6',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'startss_with_variable'
      }
    },
    false1: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'wingify',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    false3: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 'not a number',
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    false2: {
      dsl: {
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
      },
      expectation: false,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'thisis    regex',
        starts_with: '_variable'
      }
    },
    true4: {
      dsl: {
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
      },
      expectation: true,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    true1: {
      dsl: {
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
      },
      expectation: true,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 1223123,
        regex_for_all_letters: 'dsfASF',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 1234,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    true3: {
      dsl: {
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
      },
      expectation: true,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 12231023,
        regex_for_all_letters: 'dsfASF6',
        regex_for_small_letters: 'sadfAksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    },
    true2: {
      dsl: {
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
      },
      expectation: true,
      customVariables: {
        contains_vwo: 'legends say that vwo is the best',
        regex_for_no_zeros: 12231023,
        regex_for_all_letters: 'dsfASF6',
        regex_for_small_letters: 'sadfksjdf',
        regex_real_number: 12321.2242,
        regex_for_zeros: 0,
        is_equal_to: 'equal_to_variable',
        contains: 'contains_variable',
        regex_for_capital_letters: 'SADFLSDLF',
        is_not_equal_to: 'is_not_equal_to_variable',
        this_is_regex: 'this    is    regex',
        starts_with: 'starts_with_variable'
      }
    }
  },
  complex_dsl_4: {
    false4: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'snap',
        lol: 'lollolololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'lba',
        vwo_contains: 'vwo vwo vwo vwo vwo'
      }
    },
    false1: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'owv vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'half universe',
        lol: 'lolololololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'bla bla bla',
        vwo_contains: 'vwo vwo'
      }
    },
    false3: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'snap',
        lol: 'lollolololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'bla bla bla',
        vwo_contains: 'vwo vwo vwo vwo'
      }
    },
    true1: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'owv vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'half universe',
        lol: 'lollolololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'bla bla bla',
        vwo_contains: 'vwo vwo vwo vwo vwo'
      }
    },
    true3: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'owv vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'half universe',
        lol: 'lolololololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'bla bla bla',
        vwo_contains: 'vwo vwo vwo vwo vwo'
      }
    },
    true2: {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  {
                    not: {
                      or: [
                        {
                          custom_variable: {
                            thanos: 'snap'
                          }
                        }
                      ]
                    }
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          batman: 'wildcard(*i am batman*)'
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
                      joker: 'regex((joker)+)'
                    }
                  }
                ]
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    or: [
                      {
                        custom_variable: {
                          lol: 'lolololololol'
                        }
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          blablabla: 'wildcard(*bla*)'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                and: [
                  {
                    and: [
                      {
                        not: {
                          or: [
                            {
                              custom_variable: {
                                notvwo: 'notvwo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        or: [
                          {
                            and: [
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      vwovwovwo: 'regex(vwovwovwo)'
                                    }
                                  }
                                ]
                              },
                              {
                                or: [
                                  {
                                    custom_variable: {
                                      regex_vwo: 'regex(this\\s+is\\s+vwo)'
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  {
                                    not: {
                                      or: [
                                        {
                                          custom_variable: {
                                            vwo_not_equal_to: 'owv'
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    or: [
                                      {
                                        custom_variable: {
                                          vwo_equal_to: 'vwo'
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
                                      vwo_starts_with: 'wildcard(owv vwo*)'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    or: [
                      {
                        custom_variable: {
                          vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_starts_with: 'owv vwo',
        regex_vwo: 'this   is vwo',
        thanos: 'snap',
        lol: 'lolololololol',
        notvwo: 'vwo',
        joker: 'joker joker joker',
        batman: 'hello i am batman world',
        blablabla: 'bla bla bla',
        vwo_contains: 'vwo vwo vwo vwo vwo'
      }
    }
  },
  contains_operand: {
    incorrect_key: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        neq: 'something'
      }
    },
    incorrect_key_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*zzsomethingzz*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'i'
      }
    },
    case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Something'
      }
    },
    char_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*E*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    prefix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'somethingdfgdwerewew'
      }
    },
    boolean_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*true*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    part_of_text: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*zzsomethingzz*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    null_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: null
      }
    },
    upper_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'A-N-Y-T-H-I-N-G---HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH----A-N-Y-T-H-I-N-G'
      }
    },
    no_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: ''
      }
    },
    suffix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'asdn3kn42knsdsomething'
      }
    },
    boolean_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*false*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 765123.4567364
      }
    },
    numeric_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 12
      }
    },
    contains_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'asdn3kn42knsdsomethingjsbdj'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*e*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'E'
      }
    },
    special_characters: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'A-N-Y-T-H-I-N-G---f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!----A-N-Y-T-H-I-N-G'
      }
    },
    stringified_float: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: '87654123.4567902'
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*E*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'e'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*true*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 765123.7364
      }
    },
    spaces: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*nice to see you. will    you be   my        friend?*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'Hello there!! nice to see you. will    you be   my        friend? Yes, Great!!'
      }
    },
    mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'qwertyu'
      }
    },
    exact_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    numeric_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 365412363
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*false*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    missingkey_value: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {}
    },
    case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'SOMETHING'
      }
    },
    contains_operand_falsy_with_special_character: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*some*thing*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'hellosomethingworld'
      }
    }
  },
  ends_with_operand: {
    numeric_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 12
      }
    },
    float_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    float_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123.4567
      }
    },
    incorrect_key: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        neq: 'something'
      }
    },
    contains_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'asdn3kn42knsdsomethingmm'
      }
    },
    incorrect_key_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*zzsomethingzz)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'i'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*e)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'E'
      }
    },
    case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Something'
      }
    },
    special_characters: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'A-N-Y-T-H-I-N-G---f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
      }
    },
    char_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*E)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    stringified_float: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: '87654123.456000000'
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*E)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'e'
      }
    },
    prefix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'somethingdfgdwerewew'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*true)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    boolean_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*true)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 765123.0
      }
    },
    spaces: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*nice to see you. will    you be   my        friend?)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'Hello there!! nice to see you. will    you be   my        friend?'
      }
    },
    mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'qwertyu'
      }
    },
    numeric_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 3654123
      }
    },
    exact_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    part_of_text: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*zzsomethingzz)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*false)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    null_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: null
      }
    },
    upper_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'A-N-Y-T-H-I-N-G---HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
      }
    },
    no_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: ''
      }
    },
    missingkey_value: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {}
    },
    stringified_float3: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.4560000)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 98765123.456
      }
    },
    stringified_float2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.0)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 7657123
      }
    },
    case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'SOMETHING'
      }
    },
    float_data_type_extra_decimal_zeros: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 765123.456
      }
    },
    suffix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'asdn3kn42knsdsomething'
      }
    },
    boolean_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*false)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(*123.456)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 765123.456
      }
    }
  },
  equality_operand: {
    float_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.456'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    float_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.456'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123.4567
      }
    },
    incorrect_key: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        neq: 'something'
      }
    },
    incorrect_key_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'zzsomethingzz'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'i'
      }
    },
    case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Something'
      }
    },
    numeric_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 12
      }
    },
    char_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'E'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    boolean_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'true'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    part_of_text: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'zzsomethingzz'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    exact_match_with_upper_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
      }
    },
    null_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: null
      }
    },
    no_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: ''
      }
    },
    boolean_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'false'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.456'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    },
    exact_match_with_special_characters: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'e'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'E'
      }
    },
    exact_match_with_spaces: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'nice to see you. will    you be   my        friend?'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'nice to see you. will    you be   my        friend?'
      }
    },
    stringified_float: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.456'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: '123.456000000'
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'E'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'e'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'true'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.0
      }
    },
    mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'notsomething'
      }
    },
    exact_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    numeric_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'false'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    missingkey_value: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {}
    },
    stringified_float3: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.4560000'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    },
    stringified_float2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.0'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123
      }
    },
    case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'something'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'SOMETHING'
      }
    },
    float_data_type_extra_decimal_zeros: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '123.456'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456
      }
    }
  },
  new_cases_for_decimal_mismatch: {
    endswith_decimal: {
      dsl: {
        or: [
          {
            custom_variable: {
              val: 'wildcard(*123)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        val: 765123.0
      }
    },
    contains_decimal2: {
      dsl: {
        or: [
          {
            custom_variable: {
              val: 'wildcard(*123.0*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        val: 876123
      }
    },
    contains_decimal: {
      dsl: {
        or: [
          {
            custom_variable: {
              val: 'wildcard(*123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        val: 654123.2323
      }
    }
  },
  not_operator: {
    exact_match_with_special_characters: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!'
      }
    },
    float_data_type_mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.456'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 123
      }
    },
    numeric_data_type_mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 12
      }
    },
    float_data_type_mismatch2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.456'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 123.4567
      }
    },
    incorrect_key: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'something'
      }
    },
    incorrect_key_case: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'zzsomethingzz'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'i'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'e'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    case_mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'Something'
      }
    },
    exact_match_with_spaces: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'nice to see you. will    you be   my        friend?'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 'nice to see you. will    you be   my        friend?'
      }
    },
    multiple_not_operator5: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                custom_variable: {
                                  neq: 'not_eq_value'
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        neq: 'eq_value'
      }
    },
    multiple_not_operator4: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                custom_variable: {
                                  neq: 'eq_value'
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'eq_value'
      }
    },
    stringified_float: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.456'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: '123.456000000'
      }
    },
    multiple_not_operator6: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                not: {
                                  or: [
                                    {
                                      custom_variable: {
                                        neq: 'eq_value'
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        neq: 'eq_value'
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'false'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    multiple_not_operator3: {
      dsl: {
        and: [
          {
            not: {
              and: [
                {
                  not: {
                    and: [
                      {
                        custom_variable: {
                          eq: 'eq_value'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_not_operator2: {
      dsl: {
        and: [
          {
            and: [
              {
                not: {
                  and: [
                    {
                      and: [
                        {
                          custom_variable: {
                            eq: 'eq_value'
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    },
    char_data_type: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'E'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 'E'
      }
    },
    multiple_not_operator7: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                not: {
                                  or: [
                                    {
                                      custom_variable: {
                                        neq: 'neq_value'
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'eq_value'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'true'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    boolean_data_type: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'true'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123.0
      }
    },
    mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'notsomething'
      }
    },
    numeric_data_type: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    exact_match: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    part_of_text: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'zzsomethingzz'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    multiple_not_operator: {
      dsl: {
        or: [
          {
            not: {
              or: [
                {
                  not: {
                    or: [
                      {
                        custom_variable: {
                          eq: 'eq_value'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    exact_match_with_upper_case: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH'
      }
    },
    nested_not_operator: {
      dsl: {
        or: [
          {
            or: [
              {
                not: {
                  or: [
                    {
                      or: [
                        {
                          custom_variable: {
                            eq: 'eq_value'
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    },
    null_value_provided: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: null
      }
    },
    no_value_provided: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: ''
      }
    },
    missingkey_value: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {}
    },
    stringified_float3: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.4560000'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123.456
      }
    },
    stringified_float2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.0'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    case_mismatch2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'something'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'SOMETHING'
      }
    },
    float_data_type_extra_decimal_zeros: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.456'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123.456
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'E'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        eq: 'e'
      }
    },
    boolean_data_type2: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: 'false'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                eq: '123.456'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        eq: 123.456
      }
    }
  },
  or_operator: {
    multiple_or_operator_with_single_correct_value: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value',
        reg: 'wrong'
      }
    },
    single_or_operator_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'n_eq_value'
      }
    },
    multiple_or_operator: {
      dsl: {
        or: [
          {
            or: [
              {
                or: [
                  {
                    or: [
                      {
                        or: [
                          {
                            custom_variable: {
                              eq: 'eq_value'
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
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_or_operator_with_all_incorrect_correct_values: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'wrong',
        reg: 'wrong'
      }
    },
    single_or_operator_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Eq_Value'
      }
    },
    multiple_or_operator_with_all_correct_values: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value',
        reg: 'myregeXxxxxx'
      }
    },
    single_or_operator_matching: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_or_operator_with_single_correct_value2: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'wrong',
        reg: 'myregexxxxxx'
      }
    }
  },
  regex: {
    regex_operand_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(<(W[^>]*)(.*?)>)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: '<wingifySDK id=1></wingifySDK>'
      }
    },
    regex_operand2: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(<(W[^>]*)(.*?)>)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: '<WingifySDK id=1></WingifySDK>'
      }
    },
    invalid_reqex: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: '*'
      }
    },
    invalid_reqex2: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 'asdf'
      }
    },
    regex_operand_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(myregex+)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 'myregeXxxxxx'
      }
    },
    regex_operand: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(myregex+)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 'myregexxxxxx'
      }
    }
  },
  simple_and_ors: {
    single_not_true: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                neq: 'not_eq_value'
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'eq_valaue'
      }
    },
    chain_of_and_nullify_not_true: {
      dsl: {
        and: [
          {
            not: {
              and: [
                {
                  not: {
                    and: [
                      {
                        custom_variable: {
                          eq: 'eq_value'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    dsl_lower_true: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'lower(something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'SoMeThIng'
      }
    },
    dsl_regex_true: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(myregex+)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        reg: 'myregexxxxxx'
      }
    },
    chain_of_not_5_false: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                not: {
                                  or: [
                                    {
                                      custom_variable: {
                                        neq: 'eq_value'
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        neq: 'eq_value'
      }
    },
    dsl_lower_false: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'lower(something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'SoMeThIngS'
      }
    },
    dsl_regex_false: {
      dsl: {
        or: [
          {
            custom_variable: {
              reg: 'regex(myregex+)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        reg: 'myregeXxxxxx'
      }
    },
    chain_of_not_4_true: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                custom_variable: {
                                  neq: 'eq_value'
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'eq_value'
      }
    },
    dsl_eq_false: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                a: 'something'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        a: 'something'
      }
    },
    single_not_false: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                neq: 'not_eq_value'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        neq: 'not_eq_value'
      }
    },
    chain_of_or_nullify_not_true: {
      dsl: {
        or: [
          {
            not: {
              or: [
                {
                  not: {
                    or: [
                      {
                        custom_variable: {
                          eq: 'eq_value'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    dsl_wildcard_true_front_back_middle_star: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*some*thing*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'hellosome*thingworld'
      }
    },
    chain_of_or_middle_not_false: {
      dsl: {
        or: [
          {
            or: [
              {
                not: {
                  or: [
                    {
                      or: [
                        {
                          custom_variable: {
                            eq: 'eq_value'
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    },
    chain_of_not_4_false: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                custom_variable: {
                                  neq: 'not_eq_value'
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        neq: 'eq_valaue'
      }
    },
    dsl_wildcard_true_back: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'somethingworld'
      }
    },
    single_or_true: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_or_true: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value',
        reg: 'myregeXxxxxx'
      }
    },
    dsl_wildcard_true_front: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'hellosomething'
      }
    },
    dsl_wildcard_false: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*something)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'somethin'
      }
    },
    chain_of_and_true: {
      dsl: {
        and: [
          {
            and: [
              {
                and: [
                  {
                    and: [
                      {
                        and: [
                          {
                            custom_variable: {
                              eq: 'eq_value'
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
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    chain_of_and_middle_not_false: {
      dsl: {
        and: [
          {
            and: [
              {
                not: {
                  and: [
                    {
                      and: [
                        {
                          custom_variable: {
                            eq: 'eq_value'
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    },
    single_or_false: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'n_eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    },
    dsl_eq_true: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'something'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'something'
      }
    },
    multiple_and_true: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value',
        reg: 'myregexxxxxx'
      }
    },
    chain_of_not_5_true: {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [
                  {
                    not: {
                      or: [
                        {
                          not: {
                            or: [
                              {
                                not: {
                                  or: [
                                    {
                                      custom_variable: {
                                        neq: 'neq_value'
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      expectation: true,
      customVariables: {
        neq: 'eq_value'
      }
    },
    multiple_or_false: {
      dsl: {
        or: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_values',
        reg: 'myregeXxxxxx'
      }
    },
    single_and_true: {
      dsl: {
        and: [
          {
            custom_variable: {
              eq: 'eq_value'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    multiple_and_false: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  eq: 'eq_value'
                }
              }
            ]
          },
          {
            or: [
              {
                custom_variable: {
                  reg: 'regex(myregex+)'
                }
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value',
        reg: 'myregeXxxxxx'
      }
    },
    dsl_wildcard_true_front_back: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        a: 'hellosomethingworld'
      }
    },
    chain_of_or_true: {
      dsl: {
        or: [
          {
            or: [
              {
                or: [
                  {
                    or: [
                      {
                        or: [
                          {
                            custom_variable: {
                              eq: 'eq_value'
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
      },
      expectation: true,
      customVariables: {
        eq: 'eq_value'
      }
    },
    dsl_wildcard_false_front_back_middle_star: {
      dsl: {
        or: [
          {
            custom_variable: {
              a: 'wildcard(*some*thing*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        a: 'hellosomethingworld'
      }
    },
    single_and_false: {
      dsl: {
        and: [
          {
            custom_variable: {
              eq: 'n_eq_value'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'eq_value'
      }
    }
  },
  starts_with_operand: {
    float_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123.456*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 123
      }
    },
    incorrect_key: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        neq: 'something'
      }
    },
    incorrect_key_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        EQ: 'something'
      }
    },
    single_char: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(zzsomethingzz*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'i'
      }
    },
    case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'Something'
      }
    },
    char_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(E*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'E'
      }
    },
    prefix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'somethingdfgdwerewew'
      }
    },
    boolean_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(true*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: true
      }
    },
    part_of_text: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(zzsomethingzz*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'something'
      }
    },
    float_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123.456*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.456789
      }
    },
    null_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: null
      }
    },
    upper_case: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH---A-N-Y-T-H-I-N-G---'
      }
    },
    no_value_provided: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: ''
      }
    },
    suffix_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'asdsdsdsomething'
      }
    },
    boolean_data_type2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(false*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: false
      }
    },
    float_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.45
      }
    },
    numeric_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 12
      }
    },
    contains_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'asdn3kn42knsdsomethingmm'
      }
    },
    char_data_type_case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(e*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'E'
      }
    },
    special_characters: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!---A-N-Y-T-H-I-N-G---'
      }
    },
    stringified_float: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123.456*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: '123.456789'
      }
    },
    char_data_type_case_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(E*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'e'
      }
    },
    boolean_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(true*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: false
      }
    },
    numeric_data_type_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123.0
      }
    },
    spaces: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(nice to see you. will    you be   my        friend?*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'nice to see you. will    you be   my        friend? Great!!'
      }
    },
    mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'qwertyu'
      }
    },
    exact_match: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 'something'
      }
    },
    numeric_data_type: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(123*)'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        eq: 123456
      }
    },
    boolean_data_type_mismatch: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(false*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: true
      }
    },
    missingkey_value: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {}
    },
    case_mismatch2: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: 'wildcard(something*)'
            }
          }
        ]
      },
      expectation: false,
      customVariables: {
        eq: 'SOMETHING'
      }
    }
  },
  special_characters: {
    test_special_character_pound: {
      dsl: {
        or: [
          {
            custom_variable: {
              eq: '€'
            }
          }
        ]
      },
      customVariables: {
        eq: '€'
      },
      expectation: true
    }
  },
  user_operand_evaluator: {
    single_equal_return_true: {
      dsl: {
        and: [
          {
            user: 'user_1'
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1'
      },
      expectation: true
    },
    single_equal_return_false: {
      dsl: {
        and: [
          {
            user: 'user_1'
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_2'
      },
      expectation: false
    },
    multiple_equal_return_true: {
      dsl: {
        and: [
          {
            user: 'user_1,user_3,user_2,user_4'
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1'
      },
      expectation: true
    },
    multiple_equal_return_false: {
      dsl: {
        and: [
          {
            user: 'user_1,user_3,user_2,user_4'
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_5'
      },
      expectation: false
    },
    single_not_equal_return_true: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: 'user_1'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    single_not_equal_return_false: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: 'user_1'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1'
      },
      expectation: false
    },
    multiple_not_equal_return_true: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: 'user_1,user_2,user_3'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    multiple_not_equal_return_false: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: 'user_1,user_2,user_3'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_2'
      },
      expectation: false
    },
    single_not_equal_return_true_uneven_spaces: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   user_1       '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    single_not_equal_return_false_uneven_spaces: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '         user_1   '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1'
      },
      expectation: false
    },
    multiple_not_equal_return_true_uneven_spaces: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '  user_1 ,    user_2 ,   user_3    '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    multiple_not_equal_return_false_uneven_spaces: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   user_1 ,    user_2 ,     user_3     '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_2'
      },
      expectation: false
    },
    single_not_equal_return_true_spaces_in_user_id: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   space   user       '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    single_not_equal_return_false_spaces_in_user_id: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '         space   user   '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'space   user'
      },
      expectation: false
    },
    multiple_not_equal_return_true_spaces_in_user_id: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '  space   user ,    space  user ,   space user    '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4'
      },
      expectation: true
    },
    multiple_not_equal_return_false_spaces_in_user_id: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   user_1 ,    space     user ,     user_3     '
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'space     user'
      },
      expectation: false
    }
  },
  user_operand_evaluator_with_customVariables: {
    targeting_safari_returns_true: {
      dsl: {
        or: [
          {
            custom_variable: {
              browser: 'safari'
            }
          }
        ]
      },
      expectation: true,
      customVariables: {
        browser: 'safari',
        _vwoUserId: 'user_1'
      }
    },
    targeting_safari_returns_false: {
      dsl: {
        not: {
          or: [
            {
              custom_variable: {
                browser: 'safari'
              }
            }
          ]
        }
      },
      expectation: false,
      customVariables: {
        browser: 'safari',
        _vwoUserId: 'user_1'
      }
    },
    targeting_only_safari_for_user_1_returns_true: {
      dsl: {
        and: [
          {
            and: [
              {
                or: [
                  {
                    user: 'user_1'
                  }
                ]
              },
              {
                not: {
                  or: [
                    {
                      custom_variable: {
                        chrome: 'true'
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      safari: 'true'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    user: 'user_1'
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: true,
      customVariables: {
        _vwoUserId: 'user_1',
        chrome: false,
        safari: true
      }
    },
    targeting_only_safari_for_user_1_returns_false: {
      dsl: {
        and: [
          {
            and: [
              {
                or: [
                  {
                    user: 'user_1'
                  }
                ]
              },
              {
                not: {
                  or: [
                    {
                      custom_variable: {
                        chrome: 'true'
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            and: [
              {
                or: [
                  {
                    custom_variable: {
                      safari: 'true'
                    }
                  }
                ]
              },
              {
                or: [
                  {
                    user: 'user_1'
                  }
                ]
              }
            ]
          }
        ]
      },
      expectation: false,
      customVariables: {
        _vwoUserId: 'user_1',
        chrome: true,
        safari: false
      }
    },
    targeting_chrome_all_version_with_black_listing_multiple_users_returns_true: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          },
          {
            not: {
              or: [
                {
                  user: 'user_1,user_2,user_3'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4',
        browser: 'chrome 106.69'
      },
      expectation: true
    },
    targeting_chome_any_version_with_multiple_users_returns_true: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          },
          {
            or: [
              {
                user: 'user_1,user_2,user_3'
              }
            ]
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1',
        browser: 'chrome 107.107'
      },
      expectation: true
    },
    targeting_chrome_all_version_with_black_listing_multiple_users_returns_false: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          },
          {
            not: {
              or: [
                {
                  user: 'user_1,user_2,user_3'
                }
              ]
            }
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_2',
        browser: 'chrome 106.69'
      },
      expectation: false
    },
    targeting_chome_any_version_with_multiple_users_returns_false: {
      dsl: {
        and: [
          {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          },
          {
            or: [
              {
                user: 'user_1,user_2,user_3'
              }
            ]
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_4',
        browser: 'chrome 107.107'
      },
      expectation: false
    },
    black_listing_scrambled_user_using_safari_return_false: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   user    _1 ,    space     user ,     us     er_3     '
                }
              ]
            },
            and: [
              {
                custom_variable: {
                  browser: 'safari'
                }
              }
            ]
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'space     user',
        browser: 'safari'
      },
      expectation: false
    },
    black_listing_scrambled_user_using_safari_return_true_for_space_difference: {
      dsl: {
        and: [
          {
            not: {
              or: [
                {
                  user: '   user    _1 ,    space     user ,     us     er_3     '
                }
              ]
            },
            and: [
              {
                custom_variable: {
                  browser: 'safari'
                }
              }
            ]
          }
        ]
      },
      customVariables: {
        _vwoUserId: 'user_1',
        browser: 'safari'
      },
      expectation: true
    }
  }
};
