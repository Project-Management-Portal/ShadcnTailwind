import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";

interface studentType {
  id: string;
  name: string;
  dept: string;
  class: string;
  rollno: string;
  score?: number;
}

type marksTwoType = {
  id: string;
  statement: string;
  number: string;
  maxmarks: number;
  answer?: studentType[];
};

interface tableProps {
  category: string;
  questions: marksTwoType[];
  students: studentType[];
}

function ShowNumericTable({ category, questions, students }: tableProps) {
  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-400">
          <TableRow>
            <TableHead colSpan={11} className="text-white">
              {category}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Particulars
            </TableCell>
            <TableCell colSpan={4} className="text-center">
              Marks ( 25 M)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}></TableCell>
            <TableCell colSpan={4} className="text-center">
              Members
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}></TableCell>
            {students.map((student) => (
              <TableCell className="text-center" key={student.id}>
                {student.rollno}
              </TableCell>
            ))}
          </TableRow>
          {questions?.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="text-center">{`(${question.number})`}</TableCell>
              <TableCell colSpan={6}>{question.statement}</TableCell>
              {question.answer?.map((student) => (
                <TableCell className="text-center" key={student.id}>
                  <Input
                    type="number"
                    min={0}
                    max={question.maxmarks}
                    defaultValue={student.score}
                    disabled={true}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7} className="text-right">
              Total Marks
            </TableCell>
            {students.map((student) => (
              <TableCell className="text-center" key={student.id}>
                <Input
                  type="number"
                  defaultValue={student.score}
                  disabled={true}
                  className="text-red-500 font-bold text-xl"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ShowNumericTable;
