import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OptionTable from "@/components/custom/OptionTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Notify from "@/helpers/Notify";
import { Button } from "@/components/ui/button";
import NumericTable from "@/components/custom/NumericTable";
import ShowOptionTable from "@/components/custom/ShowOptionTable";
import ShowNumericTable from "@/components/custom/ShowNumericTable";

type questionType = {
  id: string;
  statement: string;
  number: string;
  answer?: string;
};

type questionNumericType = {
  id: string;
  statement: string;
  number: string;
  maxmarks: number;
  answer?: number;
};

type marksTwoType = {
  id: string;
  statement: string;
  number: string;
  maxmarks: number;
  answer?: studentType[];
};

interface resQuestionType {
  question: string;
  answer: string;
}

interface resQuestionNumericType {
  student: string;
  score: number;
}

interface finalAnswerType {
  question: string;
  answer: resQuestionNumericType[];
}

interface studentType {
  id: string;
  name: string;
  dept: string;
  class: string;
  rollno: string;
  score?: number;
}

type studentTotalScore = {
  student: string;
  score: number;
};

const categoryOne = "Problem Statement";
const categoryTwo = "Scope And Objectives";
const categoryThree = "Analysis";
const categoryFour = "Student Performance Evaluation";
function FirstReview() {
  const { id } = useParams();
  const [questionsTypeOne, setQuestionsTypeOne] = useState<questionType[]>([]);
  const [questionsTypeTwo, setQuestionsTypeTwo] = useState<questionType[]>([]);
  const [questionsTypeThree, setQuestionsTypeThree] = useState<questionType[]>(
    []
  );
  const [questionsTypeFour, setQuestionsTypeFour] = useState<
    questionNumericType[]
  >([]);
  const [students, setStudents] = useState<studentType[]>([]);
  const [reviewStudents, setReviewStudents] = useState<studentType[]>([]);
  const [reviewQuestions, setReviewQuestions] = useState<marksTwoType[]>([]);
  const [answers, setAnswers] = useState<resQuestionType[]>([]);
  const [answerNumeric, setAnswerNumeric] = useState<finalAnswerType[]>([]);
  const [objectiveCount, setObjectiveCount] = useState(0);
  const [numericCount, setNumericCount] = useState(0);
  const [isFirstSubmitted, setIsFirstSubmitted] = useState(false);
  const [isSecondSubmitted, setIsSecondSubmitted] = useState(false);
  const [studentScores, setStudentScores] = useState<studentTotalScore[]>([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = {
      reviewNo: 1,
    };

    axios
      .post("/api/v1/assessment/getquestion", data, { headers })
      .then((response) => {
        // console.log(response.data.question);
        const questions = response.data?.question;
        if (questions.length > 0) {
          const type1: questionType[] = [];
          const type2: questionType[] = [];
          const type3: questionType[] = [];
          const type4: questionNumericType[] = [];

          questions.map(
            (question: {
              _id: string;
              questioncategory: string;
              questionnumber: string;
              questionstatement: string;
              questiontype: string;
              maxmark: number;
            }) => {
              if (
                question.questioncategory === categoryOne &&
                question.questiontype === "Option"
              ) {
                type1.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                });
              } else if (
                question.questioncategory === categoryTwo &&
                question.questiontype === "Option"
              ) {
                type2.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                });
              } else if (
                question.questioncategory === categoryThree &&
                question.questiontype === "Option"
              ) {
                type3.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                });
              } else if (
                question.questioncategory === categoryFour &&
                question.questiontype === "Number"
              ) {
                type4.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                  maxmarks: question.maxmark,
                });
              }
            }
          );

          setQuestionsTypeOne(type1);
          setQuestionsTypeTwo(type2);
          setQuestionsTypeThree(type3);
          setQuestionsTypeFour(type4);
          const totalLength = type1.length + type2.length + type3.length;
          setObjectiveCount(totalLength);
          setNumericCount(type4.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/v1/project/getprojectbyid/${id}`, { headers })
      .then((response) => {
        // console.log(response);
        const res1 = response.data?.project[0]?.students;

        // console.log(res1);
        if (res1?.length > 0) {
          const students = res1?.map(
            (student: {
              _id: string;
              firstname: string;
              lastname: string;
              details: { class: string; rollno: string };
              dept: string;
            }) => {
              return {
                id: student._id,
                name: `${student.firstname} ${student.lastname}`,
                rollno: student.details.rollno,
                class: student.details.class,
                dept: student.dept,
              };
            }
          );

          setStudents(students);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        "/api/v1/assessment/getassesment",
        { reviewno: 1, project: id },
        { headers }
      )
      .then((response) => {
        // console.log(response.data?.question[0]);
        const type1: questionType[] = [];
        const type2: questionType[] = [];
        const type3: questionType[] = [];
        const type4: marksTwoType[] = [];
        if (response.data?.question?.length > 0) {
          if (response.data?.question[0].marks1.length > 0) {
            response.data?.question[0].marks1.map(
              (mark: {
                question: {
                  _id: string;
                  questioncategory: string;
                  questionnumber: string;
                  questionstatement: string;
                  questiontype: string;
                  maxmark: number;
                };
                answer: string;
              }) => {
                if (
                  mark.question.questioncategory === categoryOne &&
                  mark.question.questiontype === "Option"
                ) {
                  type1.push({
                    id: mark.question._id,
                    statement: mark.question.questionstatement,
                    number: mark.question.questionnumber,
                    answer: mark.answer,
                  });
                } else if (
                  mark.question.questioncategory === categoryTwo &&
                  mark.question.questiontype === "Option"
                ) {
                  type2.push({
                    id: mark.question._id,
                    statement: mark.question.questionstatement,
                    number: mark.question.questionnumber,
                    answer: mark.answer,
                  });
                } else if (
                  mark.question.questioncategory === categoryThree &&
                  mark.question.questiontype === "Option"
                ) {
                  type3.push({
                    id: mark.question._id,
                    statement: mark.question.questionstatement,
                    number: mark.question.questionnumber,
                    answer: mark.answer,
                  });
                }
              }
            );
            setQuestionsTypeOne(type1);
            setQuestionsTypeTwo(type2);
            setQuestionsTypeThree(type3);

            setIsFirstSubmitted(true);
          }
          if (response.data?.question[0].marks2.length > 0) {
            response.data?.question[0].marks2.map(
              (mark: {
                question: {
                  _id: string;
                  questioncategory: string;
                  questionnumber: string;
                  questionstatement: string;
                  questiontype: string;
                  maxmark: number;
                };
                answer: [
                  {
                    score: number;
                    student: {
                      _id: string;
                      firstname: string;
                      lastname: string;
                      details: { class: string; rollno: string };
                      dept: string;
                    };
                  }
                ];
              }) => {
                type4.push({
                  id: mark.question._id,
                  statement: mark.question.questionstatement,
                  number: mark.question.questionnumber,
                  maxmarks: mark.question.maxmark,
                  answer: mark.answer?.map((m) => {
                    return {
                      score: m.score,
                      id: m.student._id,
                      name: `${m.student.firstname} ${m.student.lastname}`,
                      rollno: m.student.details.rollno,
                      class: m.student.details.class,
                      dept: m.student.dept,
                    };
                  }),
                });
              }
            );
            setReviewQuestions(type4);
            setIsSecondSubmitted(true);
          }

          if (response.data?.question[0].totalmarks.length > 0) {
            const s: studentType[] = [];
            response.data?.question[0].totalmarks.map(
              (m: {
                score: number;
                student: {
                  _id: string;
                  firstname: string;
                  lastname: string;
                  details: { class: string; rollno: string };
                  dept: string;
                };
              }) => {
                s.push({
                  id: m.student._id,
                  name: `${m.student.firstname} ${m.student.lastname}`,
                  rollno: m.student.details.rollno,
                  class: m.student.details.class,
                  dept: m.student.dept,
                  score: m.score,
                });
              }
            );

            setReviewStudents(s);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  const handleSubmitObjective = () => {
    if (answers.length !== objectiveCount) {
      Notify("error", "Answer all questions");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = {
      reviewno: 1,
      project: id,
      marks1: answers,
      marks2: [],
      totalmarks: [],
      comments: "",
    };

    console.log(data);

    axios
      .post("/api/v1/assessment/submitobjectiveassesment", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Notify("success", "Objective Assesment Submitted");
          setIsFirstSubmitted(true);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNumericSubmition = () => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    // Check if any student has not been assigned marks for any question
    if (answerNumeric.length !== numericCount) {
      Notify("error", "Answer all questions");
      return;
    }
    const unassignedStudents = students.filter((student) => {
      return !answerNumeric.every((answer) =>
        answer.answer.some((a) => a.student === student.id)
      );
    });

    if (unassignedStudents.length > 0) {
      // If any student is unassigned, display an error message
      Notify("error", "Please assign marks to all students before submitting.");
      return;
    }

    // If all students have been assigned marks, proceed with submission
    console.log("Submitting marks:", answerNumeric);

    const data = {
      reviewno: 1,
      project: id,
      marks2: answerNumeric,
      totalmarks: studentScores,
      comments: "",
    };

    axios
      .post("/api/v1/assessment/submitnumericassesment", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          Notify("success", "Numeric Assesment Submitted");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-2xl capitalize font-semibold">Review One</h1>
      <Separator className="my-4 bg-black" />
      <div className="">
        <NavLink to={`/assessproject/${id}`} className="flex items-center mb-2">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <h5 className="text-black text-lg underline">Back to assesments</h5>
        </NavLink>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-5">
          Review-1 Checklist : Synopsis
        </h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Objective response</AccordionTrigger>
            <AccordionContent>
              {!isFirstSubmitted && (
                <section>
                  <OptionTable
                    category={categoryOne}
                    questions={questionsTypeOne}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                  <OptionTable
                    category={categoryTwo}
                    questions={questionsTypeTwo}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                  <OptionTable
                    category={categoryThree}
                    questions={questionsTypeThree}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                  <div className="flex justify-end pr-4 my-4">
                    {!isFirstSubmitted && (
                      <Button onClick={handleSubmitObjective}>
                        Submit response
                      </Button>
                    )}
                  </div>
                </section>
              )}
              {isFirstSubmitted && (
                <section>
                  <ShowOptionTable
                    category={categoryOne}
                    questions={questionsTypeOne}
                  />
                  <ShowOptionTable
                    category={categoryTwo}
                    questions={questionsTypeTwo}
                  />
                  <ShowOptionTable
                    category={categoryThree}
                    questions={questionsTypeThree}
                  />
                </section>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible disabled={!isFirstSubmitted}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Numeric response</AccordionTrigger>
            <AccordionContent>
              {!isSecondSubmitted && (
                <section>
                  <NumericTable
                    category={categoryFour}
                    questions={questionsTypeFour}
                    students={students}
                    answers={answerNumeric}
                    setAnswers={setAnswerNumeric}
                    studentScores={studentScores}
                    setStudentScores={setStudentScores}
                  />
                  <div className="flex justify-end pr-4 my-4">
                    {!isSecondSubmitted && (
                      <Button onClick={handleNumericSubmition}>
                        Submit response
                      </Button>
                    )}
                  </div>
                </section>
              )}
              {isSecondSubmitted && (
                <section>
                  <ShowNumericTable
                    category={categoryFour}
                    questions={reviewQuestions}
                    students={reviewStudents}
                  />
                </section>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FirstReview;
