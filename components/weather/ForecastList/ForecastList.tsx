"use client"

import { Accordion } from "react-bootstrap"

import { ForecastDay } from "@/components/weather/ForecastDay"
import { ForecastData } from "@/lib/types"

import styles from "./ForecastList.module.scss"

interface ForecastListProps {
  forecast: ForecastData
}

export function ForecastList({ forecast }: ForecastListProps) {
  const groupedByDay = forecast.list.reduce(
    (acc: Record<string, typeof forecast.list>, item) => {
      const fullDate = new Date(item.dt * 1000)
      const dateKey = fullDate.toISOString().split("T")[0]
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(item)
      return acc
    },
    {}
  )

  return (
    <Accordion defaultActiveKey="0" className={styles.forecastAccordion}>
      {Object.entries(groupedByDay).map(([dateKey, items], dayIndex) => {
        const displayDate = new Date(dateKey)

        return (
          <Accordion.Item
            key={dateKey}
            eventKey={dayIndex.toString()}
            className={styles.forecastItem}
          >
            <Accordion.Header className={styles.accordionHeader}>
              <div className="d-flex justify-content-between w-100 pe-2">
                <span className="fw-bold">
                  {displayDate.toLocaleDateString("ru-RU", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{Math.round(items[0].main.temp)}°C</span>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <div className="list-group list-group-flush">
                {items.map((item, index) => (
                  <ForecastDay
                    key={item.dt}
                    item={item}
                    isLast={index === items.length - 1}
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
