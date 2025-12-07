const hrt_timer = document.getElementById("hrt_timer")

function diffYMD(start, end) {
    let years  = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days   = end.getDate() - start.getDate();

    if (days < 0) {
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return { years, months, days };
}

const today = new Date();
const start = new Date(2025, 1, 3);

const { years, months, days } = diffYMD(start, today)

hrt_timer.innerText = `${years}y ${months}m ${days}d`