import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect } from "react";

type questionNumericType = {
  id: string;
  statement: string;
  number: string;
  maxmarks: number;
};

interface studentType {
  id: string;
  name: string;
  dept: string;
  class: string;
  rollno: string;
  score?: number;
}

interface resQuestionNumericType {
  student: string;
  score: number;
}

interface finalAnswerType {
  question: string;
  answer: resQuestionNumericType[];
}

type studentTotalScore = {
  student: string;
  score: number;
};

interface tableProps {
  category: string;
  questions: questionNumericType[];
  students: studentType[];
  answers: finalAnswerType[];
  setAnswers: Dispatch<SetStateAction<finalAnswerType[]>>;
  studentScores: studentTotalScore[];
  setStudentScores: Dispatch<SetStateAction<studentTotalScore[]>>;
}

function NumericTable({
  category,
  questions,
  students,
  answers,
  setAnswers,
  studentScores,
  setStudentScores,
}: tableProps) {
  useEffect(() => {
    // Update the total scores whenever answers change
    updateTotalScores();
  }, [answers]);

  const updateTotalScores = () => {
    const newStudentScores = students.map((student) => ({
      student: student.id,
      score: calculateTotalScore(student.id),
    }));
    setStudentScores(newStudentScores);
  };

  const calculateTotalScore = (studentId: string): number => {
    let totalScore = 0;
    answers.forEach((answer) => {
      answer.answer.forEach((a) => {
        if (a.student === studentId) {
          totalScore += a.score;
        }
      });
    });
    return totalScore;
  };

  const onInputChange = (
    questionId: string,
    studentId: string,
    score: string
  ) => {
    setAnswers((prevAnswers) => {
      // Find if there's an existing answer for this question
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question === questionId
      );

      if (existingAnswerIndex !== -1) {
        // If an existing answer is found, check if the student already has a score
        const studentIndex = prevAnswers[existingAnswerIndex].answer.findIndex(
          (a) => a.student === studentId
        );

        if (studentIndex !== -1) {
          // If the student already has a score, update it
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex].answer[studentIndex].score =
            Number(score);
          return updatedAnswers;
        } else {
          // If the student doesn't have a score, add a new entry
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex].answer.push({
            student: studentId,
            score: Number(score),
          });
          return updatedAnswers;
        }
      } else {
        // If no existing answer is found, create a new one
        return [
          ...prevAnswers,
          {
            question: questionId,
            answer: [{ student: studentId, score: Number(score) }],
          },
        ];
      }
    });
  };

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
              {students.map((student) => (
                <TableCell className="text-center" key={student.id}>
                  <Input
                    type="number"
                    min={0}
                    max={question.maxmarks}
                    defaultValue={0}
                    onChange={(e) =>
                      onInputChange(question.id, student.id, e.target.value)
                    }
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
                {studentScores.find((score) => score.student === student.id)
                  ?.score ?? 0}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default NumericTable;
