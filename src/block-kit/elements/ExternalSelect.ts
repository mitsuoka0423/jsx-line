import {
  ExternalSelect as ExternalSelectElement,
  InputBlock,
  MultiExternalSelect,
  Option as OptionComposition,
} from '@slack/types'
import { JSXSlack, BuiltInComponent, createComponent } from '../../jsx'
import { coerceToInteger } from '../../utils'
import { ConfirmableProps } from '../composition/Confirm'
import { OptionProps } from '../composition/Option'
import { plainText } from '../composition/utils'
import { InputComponentProps, wrapInInput } from '../layout/Input'
import {
  ActionProps,
  SingleSelectableProps,
  MultiSelectablePropsFrom,
} from './utils'

type OptionType = JSXSlack.Node<OptionProps> | OptionComposition

interface SingleExternalSelectProps
  extends ActionProps,
    ConfirmableProps,
    SingleSelectableProps {
  children?: never

  /**
   * An initial option _exactly_ matched to provided options from external
   * source.
   *
   * It accepts the raw {@link https://api.slack.com/reference/block-kit/composition-objects#option option composition object}
   * or `<Option>` element.
   */
  initialOption?: OptionType

  /**
   * A length of typed characters to begin request to the external data source.
   */
  minQueryLength?: number

  /** The placeholder text shown in select field. */
  placeholder?: string

  /** An alias into `initialOption` prop. */
  value?: OptionType
}

interface MultiExternalSelectProps
  extends MultiSelectablePropsFrom<
    SingleExternalSelectProps,
    'initialOption' | 'value'
  > {
  /** In multiple select, you can set multiple values through array. */
  initialOption?: OptionType | OptionType[]
  value?: OptionType | OptionType[]
}

export type ExternalSelectProps = InputComponentProps<
  SingleExternalSelectProps | MultiExternalSelectProps
>

/**
 * The interactive component or input component for
 * {@link https://api.slack.com/reference/block-kit/block-elements#external_select the `external_select` block element} and
 * {@link https://api.slack.com/reference/block-kit/block-elements#external_multi_select the `multi_external_select` block element}.
 *
 * Provide a selectable menu element from dynamic options supplied by the
 * external source.
 *
 * Slack app will need to set up the supplier of option elements first.
 * {@link https://api.slack.com/reference/block-kit/block-elements#external_select Learn about external source in Slack documentation.}
 * `<SelectFragment>` component would be useful to supply dynamic options
 * through JSX.
 *
 * @example
 * ```jsx
 * <Blocks>
 *   <Actions>
 *     <ExternalSelect
 *       actionId="category"
 *       placeholder="Select category..."
 *       minQueryLength={2}
 *     />
 *   </Actions>
 * </Blocks>
 * ```
 *
 * @return The partial JSON of a block element for selecting from the external
 *   data source, or `input` layout block with it
 */
export const ExternalSelect: BuiltInComponent<ExternalSelectProps> = createComponent<
  ExternalSelectProps,
  ExternalSelectElement | MultiExternalSelect | InputBlock
>('ExternalSelect', (props) => {
  const action_id = props.actionId || props.name
  const initialOption = props.initialOption || props.value
  const placeholder =
    props.placeholder !== undefined ? plainText(props.placeholder) : undefined
  const min_query_length = coerceToInteger(props.minQueryLength)

  return wrapInInput<ExternalSelectElement | MultiExternalSelect>(
    props.multiple
      ? {
          type: 'multi_external_select',
          action_id,
          placeholder,
          initial_options:
            initialOption !== undefined
              ? [].concat(initialOption as any)
              : undefined,
          min_query_length,
          max_selected_items: coerceToInteger(props.maxSelectedItems),
          confirm: props.confirm as any,
        }
      : {
          type: 'external_select',
          action_id: props.actionId || props.name,
          placeholder,
          initial_option: initialOption as any,
          min_query_length,
          confirm: props.confirm as any,
        },
    props,
    ExternalSelect
  )
})