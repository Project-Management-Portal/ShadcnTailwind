import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
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

import DropdownComponent from "@/components/custom/DropdownComponent";

interface Option {
  value: string;
  label: string;
}

type pair = {
  id: string;
  name: string;
};

interface teamType {
  id: string;
  teamid: string;
  teamname: string;
  leader: string;
  members: pair[];
  domains: pair[];
  priorityGuides: pair[];
  status: boolean;
}
function ShowTeams() {
  const [teams, setTeams] = useState<teamType[]>([]);
  const [guides, setGuides] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState<Option[]>([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    axios
      .get("/api/v1/get/allteachers")
      .then((res) => {
        const allGuides = res.data.map(
          (teacher: { _id: string; name: string }) => {
            return {
              value: teacher._id,
              label: teacher.name,
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
            // console.log(response.data.team);
            const allTeams = response.data.team.map(
              (team: {
                _id: string;
                teamid: string;
                teamName: string;
                leader: { name: string };
                members: [{ name: string; _id: string }];
                domains: [{ name: string; _id: string }];
                priorityGuides: [{ name: string; _id: string }];
                assignedReviewer: [{ name: string; _id: string }];
              }) => {
                return {
                  id: team._id,
                  teamid: team.teamid,
                  teamname: team.teamName,
                  leader: team.leader.name,
                  members: team.members?.map((member) => {
                    return {
                      id: member._id,
                      name: member.name,
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
                      name: guide.name,
                    };
                  }),
                  status: team.assignedReviewer?.length > 0 ? true : false,
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
  }, []);

  console.log(teams);
  

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
                          {team.members?.map((member: pair) => {
                            return (
                              <div
                                key={member.id}
                                className="flex items-center space-x-2"
                              >
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
                                  <RadioGroupItem value={guide.id} id="r1" />
                                  <Label htmlFor="r1">{guide.name}</Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        }
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Assign reviewer</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Select reviewer</DialogTitle>
                              <DialogDescription>
                                Select the reviewers to be assigned
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-1">
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
                              <Button size="sm">Assign reviewer</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                      <TableCell className="font-medium flex flex-col items-center justify-center gap-2">
                        <Button size="sm" className="bg-green-500">
                          Approve
                        </Button>
                        <Button size="sm" className="bg-red-500">
                          Reject
                        </Button>
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
