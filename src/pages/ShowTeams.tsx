import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DropdownComponent from "@/components/custom/DropdownComponent";

interface Option {
  value: string;
  label: string;
}

type pair = {
  id: string;
  name: string;
};

type member = {
  id: string;
  name: string;
  class: string;
  rollno: string;
};

interface teamType {
  id: string;
  teamid: string;
  teamname: string;
  leader: string;
  members: member[];
  domains: pair[];
  priorityGuides: pair[];
  assignedReviewers: pair[];
  status?: boolean;
}
function ShowTeams() {
  const [teams, setTeams] = useState<teamType[]>([]);
  const [guides, setGuides] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState<Option[]>([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/get/allteachers")
      .then((res) => {
        const allGuides = res.data.map(
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
    // console.log(guides);

    axios
      .get("/api/v1/team/getallteaminfo", { headers })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          if (response.data.team?.length > 0) {
            console.log(response.data.team);
            const allTeams = response.data.team.map(
              (team: {
                _id: string;
                teamid: string;
                teamName: string;
                leader: { firstname: string; lastname: string; _id: string };
                members: [
                  {
                    firstname: string;
                    lastname: string;
                    _id: string;
                    details: {
                      class: string;
                      rollno: string;
                    };
                  }
                ];
                domains: [{ name: string; _id: string }];
                priorityGuides: [
                  { firstname: string; lastname: string; _id: string }
                ];
                assignedReviewers: [
                  { firstname: string; lastname: string; _id: string }
                ];
              }) => {
                return {
                  id: team._id,
                  teamid: team.teamid,
                  teamname: team.teamName,
                  leader: team.leader.firstname + " " + team.leader.lastname,
                  members: team.members?.map((member) => {
                    return {
                      id: member._id,
                      name: member.firstname + " " + member.lastname,
                      class: member.details.class,
                      rollno: member.details.rollno,
                    };
                  }),
                  domains: team.domains?.map((domain) => {
                    return {
                      id: domain._id,
                      name: domain.name,
                    };
                  }),
                  priorityGuides: team.priorityGuides?.map((guide) => {
                    return {
                      id: guide._id,
                      name: guide.firstname + " " + guide.lastname,
                    };
                  }),
                  status: team.assignedReviewers?.length > 0 ? true : false,
                  assignedReviewers:
                    team.assignedReviewers?.length > 0
                      ? team.assignedReviewers?.map((guide) => {
                          return {
                            id: guide._id,
                            name: guide.firstname + " " + guide.lastname,
                          };
                        })
                      : [],
                };
              }
            );

            // console.log(allTeams);
            setTeams(allTeams);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const approve = (e: MouseEvent) => {
    e.preventDefault();
  };

  const reject = (e: MouseEvent, id: string) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .post("/api/v1/team/rejectteam", { teamid: id }, { headers })
      .then((response) => {
        console.log(response);
        
        if (response.status === 200) {
          setUpdate(update + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1 className="text-2xl capitalize font-semibold">All Teams</h1>
        <Separator className="my-4 bg-black" />
        <Table>
          <TableCaption>List of teams formed</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="uppercase">Teamid</TableHead>
              <TableHead className="uppercase">Team name</TableHead>
              <TableHead className="uppercase">Leader</TableHead>
              <TableHead className="uppercase">Members</TableHead>
              <TableHead className="uppercase">Domains</TableHead>
              <TableHead className="uppercase">Guides</TableHead>
              <TableHead className="uppercase">Reviewer</TableHead>
              <TableHead className="uppercase">Status</TableHead>
              <TableHead className="uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams?.length > 0
              ? teams?.map((team: teamType) => {
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">
                        {team.teamid}
                      </TableCell>
                      <TableCell className="font-medium">
                        {team.teamname}
                      </TableCell>
                      <TableCell>{team.leader}</TableCell>
                      <TableCell>
                        <RadioGroup>
                          {team.members?.map((member: member) => {
                            return (
                              <div
                                key={member.id}
                                className="flex items-center space-x-2"
                              >
                                <div>{member.rollno}</div>
                                <div>{member.name}</div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <RadioGroup>
                          {team.domains?.map((domain: pair) => {
                            return (
                              <div
                                key={domain.id}
                                className="flex items-center space-x-2"
                              >
                                <div>{domain.name}</div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        {
                          <RadioGroup>
                            {team.priorityGuides?.map((guide: pair) => {
                              return (
                                <div
                                  key={guide.id}
                                  className="flex items-center space-x-2"
                                >
                                  <div>{guide.name}</div>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          <RadioGroup>
                            {team.assignedReviewers?.length > 0 ? (
                              team.assignedReviewers.map((guide: pair) => {
                                return (
                                  <div
                                    key={guide.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <div>{guide.name}</div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center">
                                No reviewers assigned yet
                              </div>
                            )}
                          </RadioGroup>
                        }
                      </TableCell>
                      <TableCell
                        className={`${
                          team.status == true
                            ? "text-green-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        {team.status == true ? "Approved" : "Pending"}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size={"sm"} className="text-sm">
                              Take Action
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Take a action on the team
                              </DialogTitle>
                              <DialogDescription>
                                Approve or reject team
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-1">
                                <Label>Assign guide</Label>
                                <Select>
                                  <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a guide" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {team.priorityGuides.map((guide: pair) => (
                                      <SelectItem
                                        key={guide.id}
                                        value={guide.id}
                                      >
                                        {guide.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-1">
                                <Label>Assign reviewers</Label>
                                <DropdownComponent
                                  placeholder="Select reviewers"
                                  isMultiSelect={true}
                                  isEditable={true}
                                  dropdownOptions={guides}
                                  handleChange={setSelectedReviewer}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button size="sm" className="bg-green-500">
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-500"
                                onClick={(e) => reject(e, team.id)}
                              >
                                Reject
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
          <TableFooter>
            {/* <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow> */}
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

export default ShowTeams;
