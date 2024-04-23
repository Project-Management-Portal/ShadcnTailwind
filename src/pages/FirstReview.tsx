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

type questionType = {
  id: string;
  statement: string;
  number: string;
};

interface resQuestionType {
  id: string;
  answer: string;
}

const categoryOne = "Problem Statement";
const categoryTwo = "Scope And Objectives";

function FirstReview() {
  const { id } = useParams();
  const [questionsTypeOne, setQuestionsTypeOne] = useState<questionType[]>([]);
  const [questionsTypeTwo, setQuestionsTypeTwo] = useState<questionType[]>([]);
  const [answers, setAnswers] = useState<resQuestionType[]>([]);
  const [questionCount, setQuestionCount] = useState(0);

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
          setQuestionCount(questions?.length);
          questions.map(
            (question: {
              _id: string;
              questioncategory: string;
              questionnumber: string;
              questionstatement: string;
            }) => {
              if (question.questioncategory === categoryOne) {
                type1.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                });
              } else {
                type2.push({
                  id: question._id,
                  statement: question.questionstatement,
                  number: question.questionnumber,
                });
              }
            }
          );

          setQuestionsTypeOne(type1);
          setQuestionsTypeTwo(type2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmitObjective = () => {
    if (answers.length !== questionCount) {
      Notify("error", "Answer all questions");
      return;
    }

    console.log(answers);
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
                <div className="flex justify-end pr-4 my-4">
                  <Button onClick={handleSubmitObjective}>
                    Submit response
                  </Button>
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Numeric response</AccordionTrigger>
            <AccordionContent>Numeric response</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FirstReview;
