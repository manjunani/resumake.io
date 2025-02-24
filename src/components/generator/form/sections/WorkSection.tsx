import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { Input } from '../../../core/Input'
import { AddButton, IconButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'

interface HighlightsProps {
  workIndex: number
}

function Highlights({ workIndex }: HighlightsProps) {
  const { fields, append, remove } = useFieldArray({
    name: `work.${workIndex}.highlights`
  })

  return (
    <>
      <label>Job Responsibilities</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '4px',
          margin: '0.5rem 0'
        }}
      >
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <IconButton type="button">
              <MdDragIndicator />
            </IconButton>
            <Input
              name={`work.${workIndex}.highlights.${i}`}
              placeholder="Did cool stuff at company"
            />
            <IconButton type="button" onClick={() => remove(i)}>
              <MdClose />
            </IconButton>
          </Fragment>
        ))}
      </div>
      <AddButton type="button" onClick={() => append('')}>
        + Add
      </AddButton>
    </>
  )
}

export function WorkSection() {
  const { fields, append } = useFieldArray({
    name: 'work'
  })

  return (
    <FormSection title="Your Work Experience">
      <LabeledInput
        name="headings.work"
        label="Section Heading"
        placeholder="Work"
      />
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Divider />
          <LabeledInput
            name={`work.${index}.company`}
            label="Company name"
            placeholder="Netflix"
          />
          <LabeledInput
            name={`work.${index}.position`}
            label="Position"
            placeholder="Software Engineer"
          />
          <LabeledInput
            name={`work.${index}.summary`}
            label="Summary"
            placeholder="lorem ipsum"
          />
          <LabeledInput
            name={`work.${index}.startDate`}
            label="Start Date"
            placeholder="Sep 2015"
          />
          <LabeledInput
            name={`work.${index}.endDate`}
            label="End Date"
            placeholder="Jun 2019"
          />
          <Highlights workIndex={index} />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Work Experience
      </AddButton>
    </FormSection>
  )
}
