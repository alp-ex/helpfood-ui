import React, { ReactElement, useState } from 'react'
import Button from '@ui-components/atoms/Button'
import FullScreenDialog from '@ui-components/molecules/FullScreenDialog'
import Label from '@ui-components/atoms/Label'
import { useCalendar, setCurrentDay } from 'api/providers/Calendar'
import Select from '../Select'
import MealPlanForm from '../MealPlanForm'
import { editMealInPlan } from 'api/services/MealPlanRequests'

interface Props {
    labels?: { action?: string; actionButton?: string }
}

export default function EditMealPlan({
    labels: { action: actionLabel, actionButton: actionButtonLabel } = {},
}: Props): ReactElement {
    const [isDialogDisplayed, setIsDialogDisplayed] = useState(false)
    const {
        state: { weekDays, selectedDay },
        dispatch: calendarDispatch,
    } = useCalendar()
    // get recipes name from meal plan with selectedDay value, and connect meal plan provider to edit plan

    return (
        <>
            <Label>{actionLabel}</Label>

            <Select
                value={selectedDay}
                options={weekDays.map((day) => ({ label: day, value: day }))}
                onOptionClick={(value) => {
                    setCurrentDay({ dispatch: calendarDispatch, day: value })
                }}
            />

            <Button
                onClick={() => {
                    setIsDialogDisplayed(true)
                }}
            >
                {actionButtonLabel}
            </Button>

            {isDialogDisplayed ? (
                <FullScreenDialog>
                    <MealPlanForm
                        defaultValues={{ recipesName: {} }}
                        onValidate={({ recipes, day }) => {
                            editMealInPlan()
                            setIsDialogDisplayed(false)
                        }}
                        onAbort={() => {
                            setIsDialogDisplayed(false)
                        }}
                    />
                </FullScreenDialog>
            ) : null}
        </>
    )
}
