import {
  CalendarTwoTone,
  CaretLeftOutlined,
  CaretRightOutlined,
  ClockCircleTwoTone
} from "@ant-design/icons"
import {
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  Divider,
  Grid,
  Image,
  Row,
  Space,
  Table,
  Typography
} from "antd"
import { HeaderRender } from "antd/lib/calendar/generateCalendar"
import moment from "moment"
import React, { useEffect, useState } from "react"
import MainLayout from "src/layouts/MainLayout"
import { IConverter, LunarSolarConverter } from "src/utils/calendar"
import "../Home/style.css"
import { WrapperPage } from "../stylepage"
import holidays from "./holidays"
import "moment/locale/vi"

const converter: IConverter = new LunarSolarConverter()

const HomePage = () => {
  const currentDate = moment(new Date())
  const [now, setNow] = useState(moment())

  const onSelect = (value: moment.Moment) => {}

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  moment.locale("vi")

  const dateCellRender = (value: moment.Moment) => {
    const date = converter.solarToLunar({
      solarDay: value.date(),
      solarMonth: value.month() + 1,
      solarYear: value.year()
    })
    const solarDate = value.format("DD/MM")
    const lunarDate = `🌕:${date.convertToString()}`

    const solarHoliday = holidays[solarDate]
    const lunarHoliday = holidays[lunarDate]

    return (
      <Space direction="vertical" size={1}>
        <Badge status="success" text={date.convertToString()} />
        {solarHoliday && <Badge status="processing" text={solarHoliday.vi} />}
        {lunarHoliday && <Badge status="warning" text={lunarHoliday.vi} />}
      </Space>
    )
  }

  const headerRender: HeaderRender<moment.Moment> = ({
    value,
    type,
    onChange,
    onTypeChange
  }) => {
    const nextMonth = moment(value).add(1, "month")
    const prevMonth = moment(value).subtract(1, "month")
    const lunarDate = converter.solarToLunar({
      solarDay: value.date(),
      solarMonth: value.month() + 1,
      solarYear: value.year()
    })

    return (
      <Space
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 4
        }}
      >
        <Space>
          <ClockCircleTwoTone style={{ fontSize: 16 }} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {now.format("HH:mm:ss")}
          </Typography.Title>
        </Space>
        <Space>
          <CalendarTwoTone style={{ fontSize: 16 }} />
          <Typography.Title
            level={4}
            style={{ margin: 0, textTransform: "capitalize" }}
          >
            {value.locale("vi").format("dddd, D MMM yyyy")}
          </Typography.Title>
          <Divider type="vertical" />
          <CalendarTwoTone style={{ fontSize: 16 }} twoToneColor="orange" />
          <Typography.Title
            level={4}
            style={{ margin: 0, textTransform: "capitalize" }}
          >
            <Typography.Text>ÂL: </Typography.Text>
            {` ${lunarDate.convertToString()}`}
          </Typography.Title>
          <Divider type="vertical" />
          <Button onClick={() => onChange(prevMonth)}>
            <CaretLeftOutlined />
          </Button>
          <Button
            onClick={() => onChange(moment())}
            disabled={moment().diff(value, "h") === 0}
          >
            Hôm nay
          </Button>
          <Button onClick={() => onChange(nextMonth)}>
            <CaretRightOutlined />
          </Button>
        </Space>
      </Space>
    )
  }

  return (
    <WrapperPage>
      <Space
        style={{ height: "100%", backgroundColor: "white" }}
        align="baseline"
      >
        <Calendar
          onSelect={onSelect}
          dateCellRender={dateCellRender}
          headerRender={headerRender}
        />
      </Space>
      {/* <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
        Build Version:
        <b>{process.env.REACT_APP_VERSION}</b>
      </Footer> */}
    </WrapperPage>
  )
}
export default HomePage
