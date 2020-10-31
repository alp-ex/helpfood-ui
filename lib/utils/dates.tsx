export function getLocalesWeekDays(): { [key: string]: string } {
    const week: { [key: string]: string } = {}
    const sunday = new Date('25 octobre 2020')

    for (let i = 0; i < 7; i++) {
        week[i] = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
        })
            .format(new Date(sunday))
            .toLowerCase()
        sunday.setDate(sunday.getDate() + 1)
    }

    return week
}
