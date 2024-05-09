"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
const CURRENT_YEAR = new Date().getFullYear();

export const HiveDoB: React.FC<{
  setFormDob: (dob: string) => void;
}> = ({ setFormDob }) => {
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const daysInMonth = () => {
    const monthDate = new Date(year ?? 2024, (month ?? 0) + 1, 0);
    const lastDay = monthDate.getDate();

    return lastDay;
  };

  useEffect(() => {
    // YYYY - MM - DD;
    setFormDob(
      `${year}-${String(month).padStart(2, "0")}-${String(day)?.padStart(2, "0")}`
    );
  }, [month, day, year, setFormDob]);

  return (
    <div className="">
      <h4 className="font-bold leading-10">Date of Birth</h4>
      <p className="leading-5 text-muted-foreground">
        This will not be shown publicly. Confirm your own age, even if this
        account is for business, a pet, or something else.
      </p>
      <div className="flex pt-6">
        <HiveSelect
          value={month}
          handleValueChange={(month) => setMonth(parseInt(month))}
          triggerText="Month"
          triggerClassName="w-2/4"
          contentList={[
            { value: "0", text: "January" },
            { value: "1", text: "February" },
            { value: "2", text: "March" },
            { value: "3", text: "April" },
            { value: "4", text: "May" },
            { value: "5", text: "June" },
            { value: "6", text: "July" },
            { value: "7", text: "August" },
            { value: "8", text: "September" },
            { value: "9", text: "October" },
            { value: "10", text: "November" },
            { value: "11", text: "December" },
          ]}
        />
        <div className=" flex grow"></div>
        <HiveSelect
          value={day}
          handleValueChange={(day) => setDay(parseInt(day))}
          triggerText="Day"
          triggerClassName="w-1/4 mx-3"
          contentList={Array(daysInMonth())
            .fill(0)
            .map((item, index) => ({
              value: String(index + 1),
              text: String(index + 1),
            }))}
        />
        <HiveSelect
          value={year}
          handleValueChange={(year) => setYear(parseInt(year))}
          triggerText="Year"
          triggerClassName="w-1/4"
          contentList={Array(CURRENT_YEAR + 1 - 1900)
            .fill(0)
            .map((item, index) => ({
              value: String(1900 + index),
              text: String(1900 + index),
            }))
            .reverse()}
        />
      </div>
    </div>
  );
};

const HiveSelect: React.FC<{
  value: number | undefined;
  handleValueChange: (val: string) => void;
  triggerText?: string;
  contentList: { value: string; text: string }[];
  triggerClassName?: string;
}> = ({
  value,
  handleValueChange,
  triggerText,
  contentList,
  triggerClassName,
}) => {
  return (
    <Select
      defaultValue={undefined}
      value={String(value)}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        className={cn(
          "relative h-16 pt-4 text-base font-medium",
          triggerClassName
        )}
      >
        <span className="absolute left-1.5 top-1 block text-sm font-normal text-muted-foreground">
          {triggerText ?? ""}
        </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className=" min-w-fit">
        {/* JS Date Object is 0-indexed */}
        <SelectGroup>
          {contentList.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
