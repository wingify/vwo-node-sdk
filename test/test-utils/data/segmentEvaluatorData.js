const data = {
  'And Operator': [
    {
      dsl: { and: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_and_operator_matching',
      customVariables: {
        eq: 'eq_value'
      },
      expectation: true
    },
    {
      dsl: { and: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_and_operator_case_mismatch',
      customVariables: { eq: 'Eq_Value' },
      expectation: false
    },
    {
      dsl: { and: [{ and: [{ and: [{ and: [{ and: [{ custom_variable: { eq: 'eq_value' } }] }] }] }] }] },
      description: 'multiple_and_operator',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_operator_with_all_incorrect_correct_values',
      customVariables: { eq: 'wrong', reg: 'wrong' },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_operator_with_single_correct_value',
      customVariables: { eq: 'wrong', reg: 'myregexxxxxx' },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_operator_with_all_correct_values',
      customVariables: { eq: 'eq_value', reg: 'myregexxxxxx' },
      expectation: true
    },
    {
      dsl: { and: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_and_operator_mismatch',
      customVariables: { a: 'n_eq_value' },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_operator_with_single_correct_value',
      customVariables: { eq: 'eq_value', reg: 'wrong' },
      expectation: false
    }
  ],
  case_insensitive_equality_operand: [
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!)' } }] },
      description: 'exact_match_with_special_characters',
      customVariables: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.456)' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.456)' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123.4567 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(zzsomethingzz)' } }] },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(e)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(nice to see you. will    YOU be   my        Friend?)' } }] },
      description: 'exact_match_with_spaces',
      customVariables: { eq: 'nice to see you. will    YOU be   my        Friend?' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.456)' } }] },
      description: 'stringified_float',
      customVariables: { eq: '123.456000000' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(E)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(E)' } }] },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(True)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(True)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 123.0 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'mismatch',
      customVariables: { eq: 'notsomething' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123)' } }] },
      description: 'numeric_data_type',
      customVariables: { eq: 123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(zzsomethingzz)' } }] },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH)' } }] },
      description: 'exact_match_with_upper_case',
      customVariables: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(false)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'missingkey_value',
      customVariables: {},
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.4560000)' } }] },
      description: 'stringified_float',
      customVariables: { eq: 123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.0)' } }] },
      description: 'stringified_float',
      customVariables: { eq: 123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(something)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHINg' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(123.456)' } }] },
      description: 'float_data_type_extra_decimal_zeros',
      customVariables: { eq: 123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(True)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'lower(false)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: true
    }
  ],
  complex_and_ors: [
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_1',
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 1
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_2',
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 1,
        neq: 'not_eq_value'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_3',
      customVariables: {
        reg: 1,
        contain: 'zzzzzzmy_contain_valzzzzz',
        eq: 1,
        start_with: 'm1y_1sta1rt_with_val',
        neq: false
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_4',
      customVariables: {
        reg: 1,
        contain: 'my_ contain _val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: null
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_5',
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my_ contain _val',
        eq: 'eq__value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 123
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'complex_dsl_6',
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my$contain$val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 'not_matching'
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_contains_with_value',
      customVariables: {
        reg: 1,
        contain: 'zzzzzzmy_contain_valzzzzz',
        eq: 1,
        start_with: 'm1y_1sta1rt_with_val',
        neq: false
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_both_start_with_and_not_equal_to_value',
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 'not_eq_value'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_not_equal_to_value',
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 1,
        neq: 'not_eq_value'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_start_with_value',
      customVariables: {
        reg: 1,
        contain: 1,
        eq: 1,
        start_with: 'my_start_with_valzzzzzzzzzzzzzzzz',
        neq: 1
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_regex_value',
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my_ contain _val',
        eq: 'eq__value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 123
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_both_equal_to_and_regex_value',
      customVariables: {
        reg: 'myregexxxxxx',
        contain: 'my$contain$val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: 'not_matching'
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            or: [
              {
                and: [
                  { or: [{ custom_variable: { start_with: 'wildcard(my_start_with_val*)' } }] },
                  { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }
                ]
              },
              { or: [{ custom_variable: { contain: 'wildcard(*my_contain_val*)' } }] }
            ]
          },
          {
            and: [
              { or: [{ custom_variable: { eq: 'eq_value' } }] },
              { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
            ]
          }
        ]
      },
      description: 'matching_equal_to_value',
      customVariables: {
        reg: 1,
        contain: 'my_ contain _val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: null
      },
      expectation: false
    },
    {
      dsl: {},
      description: 'empty_dsl',
      customVariables: {
        reg: 1,
        contain: 'my_ contain _val',
        eq: 'eq_value',
        start_with: 'm1y_1sta1rt_with_val',
        neq: null
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_1',
      customVariables: {
        vwo_starts_with: 'v owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovovwo',
        vwo_contains: 'vwo'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_2',
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwovwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovw',
        vwo_contains: 'vwo'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_3',
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   isvwo',
        vwovwovwo: 'vwovwovw',
        vwo_contains: 'vwo'
      },
      expectation: false
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_4',
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwo',
        vwo_contains: 'vwo'
      },
      expectation: false
    },
    {
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
      description: 'true_1',
      customVariables: {
        vwo_starts_with: 'vwo owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vw'
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_2',
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vwo'
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_3',
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwovwo',
        regex_vwo: 'this   isvwo',
        vwovwovwo: 'vwovwovwo',
        vwo_contains: 'vwo'
      },
      expectation: true
    },
    {
      dsl: {
        or: [
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                  { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] }
                ]
              },
              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
            ]
          },
          {
            and: [
              {
                and: [
                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_4',
      customVariables: {
        vwo_starts_with: 'owv vwo',
        vwo_not_equal_to: 'vwo',
        vwo_equal_to: 'vwo',
        notvwo: 'vwo',
        regex_vwo: 'this   is vwo',
        vwovwovwo: 'vwo',
        vwo_contains: 'vwo'
      },
      expectation: true
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_5',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_6',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_7',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_8',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_9',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { contains_vwo: 'wildcard(*vwo*)' } }] },
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
                                  { or: [{ custom_variable: { regex_for_all_letters: 'regex(^[A-z]+$)' } }] },
                                  { or: [{ custom_variable: { regex_for_capital_letters: 'regex(^[A-Z]+$)' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { regex_for_small_letters: 'regex(^[a-z]+$)' } }] }
                            ]
                          },
                          { or: [{ custom_variable: { regex_for_no_zeros: 'regex(^[1-9]+$)' } }] }
                        ]
                      },
                      { or: [{ custom_variable: { regex_for_zeros: 'regex(^[0]+$)' } }] }
                    ]
                  },
                  { or: [{ custom_variable: { regex_real_number: 'regex(^\\\\d+(\\\\.\\\\d+)?)' } }] }
                ]
              },
              {
                or: [
                  { or: [{ custom_variable: { this_is_regex: 'regex(this\\\\s+is\\\\s+text)' } }] },
                  {
                    and: [
                      {
                        and: [
                          { or: [{ custom_variable: { starts_with: 'wildcard(starts_with_variable*)' } }] },
                          { or: [{ custom_variable: { contains: 'wildcard(*contains_variable*)' } }] }
                        ]
                      },
                      {
                        or: [
                          { not: { or: [{ custom_variable: { is_not_equal_to: 'is_not_equal_to_variable' } }] } },
                          { or: [{ custom_variable: { is_equal_to: 'equal_to_variable' } }] }
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
      description: 'false_10',
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
      },
      expectation: false
    },
    {
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
      description: 'true_5',
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
      },
      expectation: true
    },
    {
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
      description: 'true_6',
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
      },
      expectation: true
    },
    {
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
      description: 'true_7',
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
      },
      expectation: true
    },
    {
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
      description: 'true_8',
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
      },
      expectation: true
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_11',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_12',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'false_13',
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
      },
      expectation: false
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_9',
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
      },
      expectation: true
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_10',
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
      },
      expectation: true
    },
    {
      dsl: {
        and: [
          {
            or: [
              {
                and: [
                  { not: { or: [{ custom_variable: { thanos: 'snap' } }] } },
                  { or: [{ custom_variable: { batman: 'wildcard(*i am batman*)' } }] }
                ]
              },
              { or: [{ custom_variable: { joker: 'regex((joker)+)' } }] }
            ]
          },
          {
            and: [
              {
                or: [
                  { or: [{ custom_variable: { lol: 'lolololololol' } }] },
                  { or: [{ custom_variable: { blablabla: 'wildcard(*bla*)' } }] }
                ]
              },
              {
                and: [
                  {
                    and: [
                      { not: { or: [{ custom_variable: { notvwo: 'notvwo' } }] } },
                      {
                        or: [
                          {
                            and: [
                              { or: [{ custom_variable: { vwovwovwo: 'regex(vwovwovwo)' } }] },
                              { or: [{ custom_variable: { regex_vwo: 'regex(this\\\\s+is\\\\s+vwo)' } }] }
                            ]
                          },
                          {
                            or: [
                              {
                                and: [
                                  { not: { or: [{ custom_variable: { vwo_not_equal_to: 'owv' } }] } },
                                  { or: [{ custom_variable: { vwo_equal_to: 'vwo' } }] }
                                ]
                              },
                              { or: [{ custom_variable: { vwo_starts_with: 'wildcard(owv vwo*)' } }] }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  { or: [{ custom_variable: { vwo_contains: 'wildcard(*vwo vwo vwo vwo vwo*)' } }] }
                ]
              }
            ]
          }
        ]
      },
      description: 'true_11',
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
      },
      expectation: true
    }
  ],
  contains_operand: [
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*zzsomethingzz*)' } }] },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*E*)' } }] },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'prefix_match',
      customVariables: { eq: 'somethingdfgdwerewew' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*true*)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*zzsomethingzz*)' } }] },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH*)' } }] },
      description: 'upper_case',
      customVariables: { eq: 'A-N-Y-T-H-I-N-G---HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH----A-N-Y-T-H-I-N-G' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'suffix_match',
      customVariables: { eq: 'asdn3kn42knsdsomething' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*false*)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456*)' } }] },
      description: 'float_data_type',
      customVariables: { eq: 765123.4567364 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123*)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'contains_match',
      customVariables: { eq: 'asdn3kn42knsdsomethingjsbdj' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*e*)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!*)' } }] },
      description: 'special_characters',
      customVariables: { eq: 'A-N-Y-T-H-I-N-G---f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!----A-N-Y-T-H-I-N-G' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456*)' } }] },
      description: 'stringified_float',
      customVariables: { eq: '87654123.4567902' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*E*)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*true*)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123*)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 765123.7364 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*nice to see you. will    you be   my        friend?*)' } }] },
      description: 'spaces',
      customVariables: { eq: 'Hello there!! nice to see you. will    you be   my        friend? Yes, Great!!' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'mismatch',
      customVariables: { eq: 'qwertyu' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123*)' } }] },
      description: 'numeric_data_type',
      customVariables: { eq: 365412363 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*false*)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'missingkey_value',
      customVariables: {},
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something*)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHING' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*some*thing*)' } }] },
      description: 'contains_operand_falsy_test_with_special_character',
      customVariables: { a: 'hellosomethingworld' },
      expectation: false
    }
  ],
  ends_with_operand_tests: [
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456)' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456)' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123.4567 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'contains_match',
      customVariables: { eq: 'asdn3kn42knsdsomethingmm' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'incorrect_key_case',
      customVariables: { eq: 'asdn3kn42knsdsomethingmm' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*zzsomethingzz)' } }] },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*e)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!)' } }] },
      description: 'special_characters',
      customVariables: { eq: 'A-N-Y-T-H-I-N-G---f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*E)' } }] },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456)' } }] },
      description: 'stringified_float',
      customVariables: { eq: '87654123.456000000' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*E)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'prefix_match',
      customVariables: { eq: 'somethingdfgdwerewew' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*true)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*true)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 765123.0 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*nice to see you. will    you be   my        friend?)' } }] },
      description: 'spaces',
      customVariables: { eq: 'Hello there!! nice to see you. will    you be   my        friend?' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'mismatch',
      customVariables: { eq: 'qwertyu' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123)' } }] },
      description: 'numeric_data_type',
      customVariables: { eq: 3654123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*zzsomethingzz)' } }] },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*false)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH)' } }] },
      description: 'upper_case',
      customVariables: { eq: 'A-N-Y-T-H-I-N-G---HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'missingkey_value',
      customVariables: {},
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.4560000)' } }] },
      description: 'stringified_float',
      customVariables: { eq: 98765123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.0)' } }] },
      description: 'stringified_float',
      customVariables: { eq: 7657123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHING' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456)' } }] },
      description: 'float_data_type_extra_decimal_zeros',
      customVariables: { eq: 765123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*something)' } }] },
      description: 'suffix_match',
      customVariables: { eq: 'asdn3kn42knsdsomething' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*false)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(*123.456)' } }] },
      description: 'float_data_type',
      customVariables: { eq: 765123.456 },
      expectation: true
    }
  ],
  equality_operand: [
    {
      dsl: { or: [{ custom_variable: { eq: '123.456' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.456' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123.4567 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'zzsomethingzz' } }] },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'E' } }] },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'true' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'zzsomethingzz' } }] },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' } }] },
      description: 'exact_match_with_upper_case',
      customVariables: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'false' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.456' } }] },
      description: 'float_data_type',
      customVariables: { eq: 123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' } }] },
      description: 'exact_match_with_special_characters',
      customVariables: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'e' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'nice to see you. will    you be   my        friend?' } }] },
      description: 'exact_match_with_spaces',
      customVariables: { eq: 'nice to see you. will    you be   my        friend?' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.456' } }] },
      description: 'stringified_float',
      customVariables: { eq: '123.456000000' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'E' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'true' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 123.0 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'mismatch',
      customVariables: { eq: 'notsomething' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123' } }] },
      description: 'numeric_data_type',
      customVariables: { eq: 123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'false' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'missingkey_value',
      customVariables: {},
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.4560000' } }] },
      description: 'stringified_float',
      customVariables: { eq: 123.456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.0' } }] },
      description: 'stringified_float',
      customVariables: { eq: 123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'something' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHING' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: '123.456' } }] },
      description: 'float_data_type_extra_decimal_zeros',
      customVariables: { eq: 123.456 },
      expectation: true
    }
  ],
  new_cases_for_decimal_mismatch: [
    {
      dsl: { or: [{ custom_variable: { val: 'wildcard(*123)' } }] },
      description: 'endswith_decimal',
      customVariables: { val: 765123.0 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { val: 'wildcard(*123.0*)' } }] },
      description: 'contains_decimal_2',
      customVariables: { val: 876123 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { val: 'wildcard(*123*)' } }] },
      description: 'contains_decimal_3',
      customVariables: { val: 654123.2323 },
      expectation: true
    }
  ],
  not_operator_tests: [
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' } }] } },
      description: 'exact_match_with_special_characters',
      customVariables: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.456' } }] } },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123 },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123' } }] } },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.456' } }] } },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123.4567 },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'zzsomethingzz' } }] } },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'e' } }] } },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'nice to see you. will    you be   my        friend?' } }] } },
      description: 'exact_match_with_spaces',
      customVariables: { eq: 'nice to see you. will    you be   my        friend?' },
      expectation: false
    },
    {
      dsl: {
        not: {
          or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }] } }] } }]
        }
      },
      description: 'multiple_not_operator',
      customVariables: { neq: 'eq_value' },
      expectation: false
    },
    {
      dsl: {
        not: { or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'eq_value' } }] } }] } }] } }] }
      },
      description: 'multiple_not_operator',
      customVariables: { neq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.456' } }] } },
      description: 'stringified_float',
      customVariables: { eq: '123.456000000' },
      expectation: false
    },
    {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'eq_value' } }] } }] } }] } }]
              }
            }
          ]
        }
      },
      description: 'multiple_not_operator',
      customVariables: { neq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'false' } }] } },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { and: [{ not: { and: [{ not: { and: [{ custom_variable: { eq: 'eq_value' } }] } }] } }] },
      description: 'multiple_not_operator',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { and: [{ and: [{ not: { and: [{ and: [{ custom_variable: { eq: 'eq_value' } }] }] } }] }] },
      description: 'multiple_not_operator',
      customVariables: { eq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'E' } }] } },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: false
    },
    {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'neq_value' } }] } }] } }] } }]
              }
            }
          ]
        }
      },
      description: 'multiple_not_operator',
      customVariables: { neq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'true' } }] } },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'true' } }] } },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123' } }] } },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 123.0 },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'mismatch',
      customVariables: { eq: 'notsomething' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123' } }] } },
      description: 'numeric_data_type',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'zzsomethingzz' } }] } },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { eq: 'eq_value' } }] } }] } }] },
      description: 'multiple_not_operator',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' } }] } },
      description: 'exact_match_with_upper_case',
      customVariables: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH' },
      expectation: false
    },
    {
      dsl: { or: [{ or: [{ not: { or: [{ or: [{ custom_variable: { eq: 'eq_value' } }] }] } }] }] },
      description: 'nested_not_operator',
      customVariables: { eq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'missingkey_value',
      customVariables: {},
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.4560000' } }] } },
      description: 'stringified_float',
      customVariables: { eq: 123.456 },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.0' } }] } },
      description: 'stringified_float',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'something' } }] } },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHING' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.456' } }] } },
      description: 'float_data_type_extra_decimal_zeros',
      customVariables: { eq: 123.456 },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'E' } }] } },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: 'false' } }] } },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { eq: '123.456' } }] } },
      description: 'float_data_type',
      customVariables: { eq: 123.456 },
      expectation: false
    }
  ],
  or_operator: [
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_operator_with_single_correct_value',
      customVariables: { eq: 'eq_value', reg: 'wrong' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_or_operator_mismatch',
      customVariables: { a: 'n_eq_value' },
      expectation: false
    },
    {
      dsl: { or: [{ or: [{ or: [{ or: [{ or: [{ custom_variable: { eq: 'eq_value' } }] }] }] }] }] },
      description: 'multiple_or_operator',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_operator_with_all_incorrect_correct_values',
      customVariables: { eq: 'wrong', reg: 'wrong' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_or_operator_case_mismatch',
      customVariables: { eq: 'Eq_Value' },
      expectation: false
    },
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_operator_with_all_correct_values',
      customVariables: { eq: 'eq_value', reg: 'myregeXxxxxx' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_or_operator_matching',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_operator_with_single_correct_value',
      customVariables: { eq: 'wrong', reg: 'myregexxxxxx' },
      expectation: true
    }
  ],
  regex_tests: [
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(<(W[^>]*)(.*?)>)' } }] },
      description: 'regex_operand_mismatch',
      customVariables: { reg: '<wingifySDK id=1></wingifySDK>' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(<(W[^>]*)(.*?)>)' } }] },
      description: 'regex_operand',
      customVariables: { reg: '<WingifySDK id=1></WingifySDK>' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(*)' } }] },
      description: 'invalid_reqex',
      customVariables: { reg: '*' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(*)' } }] },
      description: 'invalid_reqex',
      customVariables: { reg: 'asdf' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] },
      description: 'regex_operand_case_mismatch',
      customVariables: { reg: 'myregeXxxxxx' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] },
      description: 'regex_operand',
      customVariables: { reg: 'myregexxxxxx' },
      expectation: true
    }
  ],
  simple_and_ors: [
    {
      dsl: { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } },
      description: 'single_not_true',
      customVariables: { neq: 'eq_valaue' },
      expectation: true
    },
    {
      dsl: { and: [{ not: { and: [{ not: { and: [{ custom_variable: { eq: 'eq_value' } }] } }] } }] },
      description: 'chain_of_and_nullify_not_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { a: 'lower(something)' } }] },
      description: 'dsl_lower_true',
      customVariables: { a: 'SoMeThIng' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] },
      description: 'dsl_regex_true',
      customVariables: { reg: 'myregexxxxxx' },
      expectation: true
    },
    {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'eq_value' } }] } }] } }] } }]
              }
            }
          ]
        }
      },
      description: 'chain_of_not_5_false',
      customVariables: { neq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { a: 'lower(something)' } }] },
      description: 'dsl_lower_false',
      customVariables: { a: 'SoMeThIngS' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] },
      description: 'dsl_regex_false',
      customVariables: { reg: 'myregeXxxxxx' },
      expectation: false
    },
    {
      dsl: {
        not: { or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'eq_value' } }] } }] } }] } }] }
      },
      description: 'chain_of_not_4_true',
      customVariables: { neq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { not: { or: [{ custom_variable: { a: 'something' } }] } },
      description: 'dsl_eq_false',
      customVariables: { a: 'something' },
      expectation: false
    },
    {
      dsl: { not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } },
      description: 'single_not_false',
      customVariables: { neq: 'not_eq_value' },
      expectation: false
    },
    {
      dsl: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { eq: 'eq_value' } }] } }] } }] },
      description: 'chain_of_or_nullify_not_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*some*thing*)' } }] },
      description: 'dsl_wildcard_true_front_back_middle_star',
      customVariables: { a: 'hellosome*thingworld' },
      expectation: true
    },
    {
      dsl: { or: [{ or: [{ not: { or: [{ or: [{ custom_variable: { eq: 'eq_value' } }] }] } }] }] },
      description: 'chain_of_or_middle_not_false',
      customVariables: { eq: 'eq_value' },
      expectation: false
    },
    {
      dsl: {
        not: {
          or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'not_eq_value' } }] } }] } }] } }]
        }
      },
      description: 'chain_of_not_4_false',
      customVariables: { neq: 'eq_valaue' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(something*)' } }] },
      description: 'dsl_wildcard_true_back',
      customVariables: { a: 'somethingworld' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_or_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_true',
      customVariables: { eq: 'eq_value', reg: 'myregeXxxxxx' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*something)' } }] },
      description: 'dsl_wildcard_true_front',
      customVariables: { a: 'hellosomething' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*something)' } }] },
      description: 'dsl_wildcard_false',
      customVariables: { a: 'somethin' },
      expectation: false
    },
    {
      dsl: { and: [{ and: [{ and: [{ and: [{ and: [{ custom_variable: { eq: 'eq_value' } }] }] }] }] }] },
      description: 'chain_of_and_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { and: [{ and: [{ not: { and: [{ and: [{ custom_variable: { eq: 'eq_value' } }] }] } }] }] },
      description: 'chain_of_and_middle_not_false',
      customVariables: { eq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'n_eq_value' } }] },
      description: 'single_or_false',
      customVariables: { eq: 'eq_value' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { a: 'something' } }] },
      description: 'dsl_eq_true',
      customVariables: { a: 'something' },
      expectation: true
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_true',
      customVariables: { eq: 'eq_value', reg: 'myregexxxxxx' },
      expectation: true
    },
    {
      dsl: {
        not: {
          or: [
            {
              not: {
                or: [{ not: { or: [{ not: { or: [{ not: { or: [{ custom_variable: { neq: 'neq_value' } }] } }] } }] } }]
              }
            }
          ]
        }
      },
      description: 'chain_of_not_5_true',
      customVariables: { neq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        or: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_or_false',
      customVariables: { eq: 'eq_values', reg: 'myregeXxxxxx' },
      expectation: false
    },
    {
      dsl: { and: [{ custom_variable: { eq: 'eq_value' } }] },
      description: 'single_and_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: {
        and: [
          { or: [{ custom_variable: { eq: 'eq_value' } }] },
          { or: [{ custom_variable: { reg: 'regex(myregex+)' } }] }
        ]
      },
      description: 'multiple_and_false',
      customVariables: { eq: 'eq_value', reg: 'myregeXxxxxx' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*something*)' } }] },
      description: 'dsl_wildcard_true_front_back',
      customVariables: { a: 'hellosomethingworld' },
      expectation: true
    },
    {
      dsl: { or: [{ or: [{ or: [{ or: [{ or: [{ custom_variable: { eq: 'eq_value' } }] }] }] }] }] },
      description: 'chain_of_or_true',
      customVariables: { eq: 'eq_value' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { a: 'wildcard(*some*thing*)' } }] },
      description: 'dsl_wildcard_false_front_back_middle_star',
      customVariables: { a: 'hellosomethingworld' },
      expectation: false
    },
    {
      dsl: { and: [{ custom_variable: { eq: 'n_eq_value' } }] },
      description: 'single_and_false',
      customVariables: { eq: 'eq_value' },
      expectation: false
    }
  ],
  starts_with_operand_tests: [
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123.456*)' } }] },
      description: 'float_data_type_mismatch',
      customVariables: { eq: 123 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'incorrect_key',
      customVariables: { neq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'incorrect_key_case',
      customVariables: { EQ: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(zzsomethingzz*)' } }] },
      description: 'single_char',
      customVariables: { eq: 'i' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'Something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(E*)' } }] },
      description: 'char_data_type',
      customVariables: { eq: 'E' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'prefix_match',
      customVariables: { eq: 'somethingdfgdwerewew' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(true*)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: true },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(zzsomethingzz*)' } }] },
      description: 'part_of_text',
      customVariables: { eq: 'something' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123.456*)' } }] },
      description: 'float_data_type',
      customVariables: { eq: 123.456789 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'null_value_provided',
      customVariables: { eq: null },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH*)' } }] },
      description: 'upper_case',
      customVariables: { eq: 'HgUvshFRjsbTnvsdiUFFTGHFHGvDRT.YGHGH---A-N-Y-T-H-I-N-G---' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'no_value_provided',
      customVariables: { eq: '' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'suffix_match',
      customVariables: { eq: 'asdsdsdsomething' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(false*)' } }] },
      description: 'boolean_data_type',
      customVariables: { eq: false },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123*)' } }] },
      description: 'float_data_type',
      customVariables: { eq: 123.45 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123*)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 12 },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'contains_match',
      customVariables: { eq: 'asdn3kn42knsdsomethingmm' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(e*)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'E' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!*)' } }] },
      description: 'special_characters',
      customVariables: { eq: 'f25u!v@b#k$6%9^f&o*v(m)w_-=+s,./`(*&^%$#@!---A-N-Y-T-H-I-N-G---' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123.456*)' } }] },
      description: 'stringified_float',
      customVariables: { eq: '123.456789' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(E*)' } }] },
      description: 'char_data_type_case_mismatch',
      customVariables: { eq: 'e' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(true*)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: false },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123*)' } }] },
      description: 'numeric_data_type_mismatch',
      customVariables: { eq: 123.0 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(nice to see you. will    you be   my        friend?*)' } }] },
      description: 'spaces',
      customVariables: { eq: 'nice to see you. will    you be   my        friend? Great!!' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'mismatch',
      customVariables: { eq: 'qwertyu' },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'exact_match',
      customVariables: { eq: 'something' },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(123*)' } }] },
      description: 'numeric_data_type',
      customVariables: { eq: 123456 },
      expectation: true
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(false*)' } }] },
      description: 'boolean_data_type_mismatch',
      customVariables: { eq: true },
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'missingkey_value',
      customVariables: {},
      expectation: false
    },
    {
      dsl: { or: [{ custom_variable: { eq: 'wildcard(something*)' } }] },
      description: 'case_mismatch',
      customVariables: { eq: 'SOMETHING' },
      expectation: false
    }
  ]
};

module.exports = data;
