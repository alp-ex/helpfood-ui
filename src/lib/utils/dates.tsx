export function getWeekDaysFromNow() {
    const week = new Array()
    const currentDay = new Date(Date.now())

    for (var i = 0; i < 7; i++) {
        week.push(
            new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
            }).format(new Date(currentDay))
        )
        currentDay.setDate(currentDay.getDate() + 1)
    }

    return week
}
