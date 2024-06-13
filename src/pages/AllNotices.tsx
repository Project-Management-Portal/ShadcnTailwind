import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

type responseType = {
  description: string;
  date: string;
  files: [
    {
      _id: string;
      link: string;
      name: string;
    }
  ];
  title: string;
  _id: string;
};

function AllNotices() {
  const [notices, setNotices] = useState<responseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/v1/notices", {
        headers: {
          auth_token: localStorage.getItem("auth_token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setNotices(res.data.notices);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl capitalize font-semibold">All notices</h1>
        <Separator className="my-4 bg-black" />
        <section className="">
          {!isLoading ? (
            notices.length > 0 ? (
              notices.map((notice: responseType) => {
                const date = new Date(notice.date);
                return (
                  <Card
                    key={notice._id}
                    className="w-full bg-blue-100 border-2 border-gray-100 mb-4"
                  >
                    <CardHeader>
                      <CardTitle>{notice.title}</CardTitle>
                      <CardDescription>
                        {date.toString().split(" ").slice(0, 4).join(" ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{notice.description}</CardContent>
                    <CardFooter className="flex items-center gap-3 flex-wrap">
                      {notice.files.length > 0
                        ? notice.files.map((file, index) => {
                            return (
                              <NavLink
                                key={index}
                                to={file.link}
                                target="_blank"
                                className={
                                  "bg-white cursor-pointer p-2 rounded-md"
                                }
                              >
                                {file.name}
                              </NavLink>
                            );
                          })
                        : ""}
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div>No notices yet</div>
            )
          ) : (
            <>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] bg-gray-300 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] bg-gray-300 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] bg-gray-300 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                  <Skeleton className="h-4 bg-gray-300 w-full " />
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default AllNotices;
