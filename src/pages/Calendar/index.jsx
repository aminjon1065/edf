import React, {useEffect, useState} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarComponent from "../../components/CalendarComponent";
import api from "../../services/api";

const groupDocumentsByDates = (documents) => {
    const events = {};

    documents.forEach(doc => {
        if (!events[doc.created_at.split('T')[0]]) {
            events[doc.created_at.split('T')[0]] = [];
        }
        events[doc.created_at.split('T')[0]].push({...doc, eventType: 'created'});

        if (doc.date_done) {
            const dateDone = doc.date_done.split('T')[0];
            if (!events[dateDone]) {
                events[dateDone] = [];
            }
            events[dateDone].push({...doc, eventType: 'done'});
        }
    });

    return events;
};

const getMonthStartAndEnd = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0); // 0 день следующего месяца — это последний день текущего месяца
    return {start, end};
};

const generateDays = (groupedDocs, currentDate) => {
    const {start: startDate, end: endDate} = getMonthStartAndEnd(currentDate);
    const dayList = [];

    // Добавляем дни перед первым днем месяца
    for (let i = 0; i < startDate.getDay() - 1; i++) {
        dayList.push({
            date: '', // Пустая дата
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            events: []
        });
    }

    let day = startDate;

    while (day <= endDate) {
        const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        dayList.push({
            date: formattedDate,
            isCurrentMonth: day.getMonth() === currentDate.getMonth(),
            isToday: formattedDate === new Date().toISOString().split('T')[0],
            isSelected: false, // Здесь может быть ваша логика для выбора дня
            events: groupedDocs[formattedDate] || []
        });
        day.setDate(day.getDate() + 1);
    }

    // Добавляем дни после последнего дня месяца, если необходимо
    while (dayList.length % 7 !== 0) {
        dayList.push({
            date: '', // Пустая дата
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            events: []
        });
    }

    return dayList;
};

const Index = () => {
    const [documents, setDocuments] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const goToNextMonth = () => {
        console.log("goToNextMonth called");
        setCurrentMonth(prevMonth => {
            return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
        });
    };

    const goToPreviousMonth = () => {
        console.log("goToPreviousMonth called");
        setCurrentMonth(prevMonth => {
            return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1);
        });
    };
    useEffect(() => {
        fetchDocuments(currentMonth);
    }, [currentMonth]);
    const fetchDocuments = (monthDate) => {
        const {start, end} = getMonthStartAndEnd(monthDate);
        api.get(`/get-documents?start=${start.toISOString()}&end=${end.toISOString()}`).then((response) => {
            setDocuments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const groupedDocs = groupDocumentsByDates(documents);

    const dates = documents.map(doc => new Date(doc.created_at));
    if (documents.some(doc => doc.date_done)) {
        documents.filter(doc => doc.date_done).forEach(doc => dates.push(new Date(doc.date_done)));
    }
    //
    // const startDate = new Date(Math.min(...dates));
    // const endDate = new Date(Math.max(...dates));

    const days = generateDays(groupedDocs, currentMonth);
    return (
        <div>
            <CalendarComponent days={days} goToNextMonth={goToNextMonth} goToPreviousMonth={goToPreviousMonth}/>
        </div>
    );
};

export default Index;