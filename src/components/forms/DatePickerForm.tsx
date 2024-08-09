/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerForm = ({ control, setValue }: any) => {
  const tenDaysFromCurrentDate = new Date();
  tenDaysFromCurrentDate.setDate(tenDaysFromCurrentDate.getDate() + 10);

  // Date Picker
  const [startDate, setStartDate] = useState<Date>(tenDaysFromCurrentDate);
  const handleDateChange = (dateChange: Date | null) => {
    const ISOdate = dateChange ? dateChange.toISOString() : "";
    setValue("releaseDate", ISOdate, {
      shouldDirty: true,
    });
    setStartDate(dateChange ? new Date(ISOdate) : new Date());
  };

  return (
    <div className="-mt-6 mb-2 md:-mt-0.5">
      <Label htmlFor="Release Date">Release Date</Label>
      <Controller
        name="releaseDate"
        control={control}
        defaultValue={startDate.toISOString()} // Convert startDate to string
        render={() => (
          <DatePicker
            selected={startDate}
            placeholderText="Select date"
            minDate={tenDaysFromCurrentDate}
            onChange={(date: Date | null) => handleDateChange(date)}
            className="w-full rounded-lg bg-secondary py-3"
            wrapperClassName="w-full"
          />
        )}
      />
    </div>
  );
};

export default DatePickerForm;
