import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropdownComponent from "@/components/custom/DropdownComponent";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import Notify from "@/helpers/Notify";
import { customAlphabet } from "nanoid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Option {
  value: string;
  label: string;
}

interface resTeam {
  id: string;
  teamName: string;
  teamid: string;
  leader: {
    id: string;
    name: string;
  };
  domains: Option[];
  members: Option[];
  priorityGuides: Option[];
  assignedGuide: Option[];
  assignedReviewer: Option[];
  status: boolean;
}

interface requestType {
  id: string;
  userid: string;
  teamid: string;
  name: string;
  email: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}
function CreateTeam() {
  const [teamname, setTeamname] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState<Option[]>([]);
  const [guides, setGuides] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState<Option[]>([]);
  // const [assignedGuide, setAssignedGuide] = useState<Option[]>([]);
  // const [assignedReviewer, setAssignedReviewer] = useState<Option[]>([]);
  const [teamDetails, setTeamDetails] = useState<resTeam>({
    id: "",
    teamName: "",
    teamid: "",
    leader: {
      name: "",
      id: "",
    },
    domains: [],
    members: [],
    priorityGuides: [],
    assignedGuide: [],
    assignedReviewer: [],
    status: false,
  });
  const [requests, setRequests] = useState<requestType[]>([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const [update, setUpdate] = useState(0);
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const t = localStorage.getItem("isJoinedTeam");
  let isJoinedTeam: boolean | null = null;
  if (t) {
    isJoinedTeam = JSON.parse(t);
  }

  const s = localStorage.getItem("submittedTeam");
  let isSubmittedTeam: boolean | null = null;
  if (s) {
    isSubmittedTeam = JSON.parse(s);
  }

  const d = localStorage.getItem("user");
  let user: User | null = null;
  if (d) {
    user = JSON.parse(d);
  }

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    axios
      .get("/api/v1/domains", { headers })
      .then((res) => {
        const allDomains = res.data.map(
          (domain: { _id: string; name: string }) => {
            return {
              value: domain._id,
              label: domain.name,
            };
          }
        );
        setDomains(allDomains);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/v1/teachers/all", { headers })
      .then((res) => {
        console.log(res);

        const allGuides = res.data.teachers.map(
          (teacher: {
            _id: string;
            firstname: string;
            lastname: string;
            salutation: string;
          }) => {
            return {
              value: teacher._id,
              label:
                teacher.salutation +
                " " +
                teacher.firstname +
                " " +
                teacher.lastname,
            };
          }
        );
        setGuides(allGuides);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "/api/v1/teams/myteam",

        { headers }
      )
      .then((response) => {
        // console.log(response.data.team[0]);
        const myteam = response.data.team;
        if (response.status === 201) {
          if (response.data.team?.length > 0) {
            const allDomains = response.data.team[0].domains.map(
              (domain: { _id: string; name: string }) => {
                return {
                  value: domain._id,
                  label: domain.name,
                };
              }
            );
            const id = response.data.team[0]._id;
            const teamName = response.data.team[0].teamName;

            const teamid = response.data.team[0].teamid;

            const leader = {
              name:
                response.data.team[0].leader?.firstname +
                " " +
                response.data.team[0].leader?.lastname,
              id: response.data.team[0].leader?.user,
            };

            const members = response.data.team[0].members.map(
              (member: {
                _id: string;
                firstname: string;
                lastname: string;
              }) => {
                return {
                  value: member._id,
                  label: member.firstname + " " + member.lastname,
                };
              }
            );

            const priorityGuides = response.data.team[0].priorityGuides.map(
              (guide: {
                _id: string;
                firstname: string;
                lastname: string;
                salutation: string;
              }) => {
                return {
                  value: guide._id,
                  label:
                    guide.salutation +
                    " " +
                    guide.firstname +
                    " " +
                    guide.lastname,
                };
              }
            );

            const assignedReviewers =
              response.data.team[0].assignedReviewer?.length > 0
                ? response.data.team[0].assignedReviewer?.map(
                    (guide: {
                      _id: string;
                      firstname: string;
                      lastname: string;
                      salutation: string;
                    }) => {
                      return {
                        value: guide._id,
                        label:
                          guide.salutation +
                          " " +
                          guide.firstname +
                          " " +
                          guide.lastname,
                      };
                    }
                  )
                : [];

            const assignedGuide =
              response.data.team[0].assignedGuide?.length > 0
                ? response.data.team[0].assignedGuide?.map(
                    (guide: {
                      _id: string;
                      firstname: string;
                      lastname: string;
                      salutation: string;
                    }) => {
                      return {
                        value: guide._id,
                        label:
                          guide.salutation +
                          " " +
                          guide.firstname +
                          " " +
                          guide.lastname,
                      };
                    }
                  )
                : [];

            const status =
              response.data.team[0].assignedReviewer?.length == 0
                ? false
                : true;
            setTeamDetails({
              id,
              teamName,
              teamid,
              leader,
              domains: allDomains,
              members,
              priorityGuides,
              assignedReviewer: assignedReviewers,
              assignedGuide: assignedGuide,
              status: status,
            });
          }

          if (myteam?.length <= 0) {
            localStorage.setItem("isJoinedTeam", JSON.stringify(false));
          } else {
            localStorage.setItem("isJoinedTeam", JSON.stringify(true));
            if (myteam[0]?.approvedByLeader) {
              localStorage.setItem("submittedTeam", JSON.stringify(true));
            } else {
              localStorage.setItem("submittedTeam", JSON.stringify(false));
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update, setUpdate]);

  const handleCreate = (e: MouseEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    if (!teamname) {
      Notify("error", "Please enter a team name");
      return;
    }

    if (selectedDomains.length < 1) {
      Notify("error", "Please select atleast one domain");
      return;
    }

    if (selectedGuides.length < 1) {
      Notify("error", "Please select guides");
      return;
    }

    if (selectedGuides.length !== 3) {
      Notify("error", "Please select atmost 3 guides");
      return;
    }

    const teamId = nanoid(8);

    const form_data = {
      teamName: teamname,
      teamid: teamId,
      priorityGuides: selectedGuides.map(
        (guide: { value: string }) => guide.value
      ),
      domains: selectedDomains.map((domain: { value: string }) => domain.value),
    };
    console.log(form_data);
    setButtonLoad(true);
    axios
      .post("/api/v1/teams", form_data, { headers })
      .then((res) => {
        console.log(res.data);

        if (res.status === 201) {
          Notify("success", "Team created");
          setButtonLoad(false);
          setUpdate((prev) => prev + 2);
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonLoad(false);
      });
  };

  const deleteTeam = (e: MouseEvent) => {
    e.preventDefault();
    const teamid = teamDetails?.id;
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    setButtonLoad(true);
    axios
      .post("/api/v1/team/deleteteam", { teamid }, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 201 || res.status == 200) {
          Notify("success", "Team Deleted");
          setButtonLoad(false);
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);

        setButtonLoad(false);
      });
  };

  const getJoinRequests = (e: MouseEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    const data = teamDetails?.id;
    setIsOpen(true);
    axios
      .post("/api/v1/team/getjoinrequests", { teamid: data }, { headers })
      .then((response) => {
        console.log(response.data.requests);
        if (response.status === 201) {
          const data = response.data.requests.map(
            (request: {
              _id: string;
              teamid: string;
              userid: {
                _id: string;
                firstname: string;
                lastname: string;
                email: string;
              };
            }) => {
              const req = {
                id: request._id,
                userid: request.userid._id,
                teamid: request.teamid,
                name: request.userid.firstname + " " + request.userid.lastname,
                email: request.userid.email,
              };
              return req;
            }
          );

          setRequests(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const jointeam = (e: MouseEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    const data = { teamid: code };

    axios
      .post("/api/v1/team/jointeam", data, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          Notify("success", "Request sent");
        }
      })
      .catch((error) => {
        console.log(error);
        Notify("error", error.response.data.message);
      });
  };

  const accept = (e: MouseEvent, teamid: string, userid: string) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    const data = { teamid: teamid, userid: userid };
    console.log(data);

    axios
      .post("/api/v1/team/approvejoinrequest", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Notify("success", "Request Accepted");
        }
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data.message);
        setIsOpen(false);
      });
  };

  const reject = (e: MouseEvent, teamid: string, userid: string) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    axios
      .post("/api/v1/team/rejectjoinrequest", { teamid, userid }, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Notify("success", "Request rejected");
        }
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data.message);
        setIsOpen(false);
      });
  };

  const submit = (e: MouseEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };
    const teamid = teamDetails?.id;
    axios
      .post("/api/v1/team/submitteam", { teamid }, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Notify("success", "Team submitted");
          localStorage.setItem("submittedTeam", JSON.stringify(true));
        }
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data.message);
      });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl capitalize font-semibold">My Team</h1>
        <Separator className="my-4 bg-black" />
        <div>
          {!isJoinedTeam && (
            <div className="space-y-4">
              <Card className="bg-blue-100">
                <CardHeader>
                  <CardTitle>Create team</CardTitle>
                  <CardDescription>
                    Create your team here. Click create team when done
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="teamname">Team name</Label>
                    <Input
                      id="teamname"
                      placeholder="e.g., The Avengers"
                      onChange={(e) => setTeamname(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="domains">Domains</Label>
                    <DropdownComponent
                      placeholder="Select domains"
                      isMultiSelect={true}
                      isEditable={true}
                      dropdownOptions={domains}
                      handleChange={setSelectedDomains}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="Guides">Guides</Label>
                    <DropdownComponent
                      placeholder="Select guides"
                      isMultiSelect={true}
                      isEditable={true}
                      dropdownOptions={guides}
                      handleChange={setSelectedGuides}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={buttonLoad} onClick={handleCreate}>
                    {buttonLoad && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Create team
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-blue-100">
                <CardHeader>
                  <CardTitle>Join team</CardTitle>
                  <CardDescription>
                    Join the team with the code provided by the leader
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="code">Enter code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., fdfds898sdf"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={buttonLoad} onClick={jointeam}>
                    {buttonLoad && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Join team
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {isJoinedTeam && (
            <div className="">
              <Card className="bg-blue-100">
                <CardHeader>
                  <CardTitle>Team Details</CardTitle>
                  <CardDescription>
                    Your teams details are here...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="teamname">Team name</Label>
                    {teamDetails && (
                      <div className="w-full p-2 bg-white rounded-sm">
                        {teamDetails?.teamName}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="teamid">Team Id</Label>
                    {teamDetails && (
                      <div className="w-full p-2 bg-white rounded-sm">
                        {teamDetails?.teamid}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="leader">Team Leader</Label>
                    {teamDetails && (
                      <div className="w-full p-2 bg-white rounded-sm">
                        {teamDetails?.leader.name}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="domains">Domains</Label>
                    <Accordion
                      type="single"
                      collapsible
                      className={"bg-white rounded-md"}
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="py-2 px-2">
                          All selected domains
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="p-2">
                            {teamDetails?.domains.map(
                              (domain: { value: string; label: string }) => {
                                return (
                                  <li key={domain.value} className="mb-1">
                                    {domain.label}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="members">Members</Label>
                    <Accordion
                      type="single"
                      collapsible
                      className={"bg-white rounded-md"}
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="py-2 px-2">
                          All team members
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="p-2">
                            {teamDetails?.members.map(
                              (member: { value: string; label: string }) => {
                                return (
                                  <li key={member.value} className="mb-1">
                                    {member.label}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {teamDetails?.assignedGuide?.length > 0 ? (
                    <div className="space-y-1">
                      <Label htmlFor="priorityguides">Assigned Guide</Label>
                      <Accordion
                        type="single"
                        collapsible
                        className={"bg-white rounded-md"}
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="py-2 px-2">
                            Assigned Guide
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="p-2">
                              {teamDetails?.assignedGuide.map(
                                (guide: { value: string; label: string }) => {
                                  return (
                                    <li key={guide.value} className="mb-1">
                                      {guide.label}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Label htmlFor="priorityguides">Priority Guides</Label>
                      <Accordion
                        type="single"
                        collapsible
                        className={"bg-white rounded-md"}
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="py-2 px-2">
                            All Guides
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="p-2">
                              {teamDetails?.priorityGuides.map(
                                (guide: { value: string; label: string }) => {
                                  return (
                                    <li key={guide.value} className="mb-1">
                                      {guide.label}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}

                  {teamDetails?.assignedReviewer?.length > 0 && (
                    <div className="space-y-1">
                      <Label htmlFor="priorityguides">Assigned reviewers</Label>
                      <Accordion
                        type="single"
                        collapsible
                        className={"bg-white rounded-md"}
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="py-2 px-2">
                            All assigned reviewers
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="p-2">
                              {teamDetails?.assignedReviewer.map(
                                (guide: { value: string; label: string }) => {
                                  return (
                                    <li key={guide.value} className="mb-1">
                                      {guide.label}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-8">
                  {!isSubmittedTeam ? (
                    teamDetails?.leader.id === user?._id && (
                      <>
                        <Button
                          disabled={buttonLoad}
                          onClick={deleteTeam}
                          variant="destructive"
                        >
                          {buttonLoad && (
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          )}
                          Delete Team
                        </Button>
                        <Button className="bg-green-500" onClick={submit}>
                          Submit Team
                        </Button>
                        <Button onClick={getJoinRequests} variant="outline">
                          Show join requests
                        </Button>
                      </>
                    )
                  ) : (
                    <>
                      {teamDetails?.status == false ? (
                        <div>
                          <Badge variant={"destructive"}>
                            Team approval pending
                          </Badge>
                        </div>
                      ) : (
                        <div>
                          <Badge
                            variant={"destructive"}
                            className="bg-green-500"
                          >
                            Team approved
                          </Badge>
                        </div>
                      )}
                    </>
                  )}

                  <Dialog
                    onOpenChange={onClose}
                    defaultOpen={false}
                    open={isOpen}
                  >
                    <DialogTrigger></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Join requests</DialogTitle>
                        <DialogDescription>
                          All your joining requests for team are here
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <ScrollArea className="h-72 w-full rounded-md border">
                          <div className="p-4">
                            <h4 className="mb-4 text-sm font-medium leading-none">
                              Tags
                            </h4>
                            {requests.map(
                              (request: requestType, index: number) => (
                                <>
                                  <div
                                    key={index}
                                    className="flex justify-between items-center"
                                  >
                                    <div className="text-sm">
                                      {request.name}
                                    </div>
                                    <div className="space-x-3">
                                      <Button
                                        size={"sm"}
                                        className="bg-green-500"
                                        onClick={(e) =>
                                          accept(
                                            e,
                                            request.teamid,
                                            request.userid
                                          )
                                        }
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size={"sm"}
                                        className="bg-red-600"
                                        onClick={(e) =>
                                          reject(
                                            e,
                                            request.teamid,
                                            request.userid
                                          )
                                        }
                                      >
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                  <Separator className="my-2" />
                                </>
                              )
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
