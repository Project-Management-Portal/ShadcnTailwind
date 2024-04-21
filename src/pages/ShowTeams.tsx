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
import Notify from "@/helpers/Notify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

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
  assignedGuide: pair[];
  status?: boolean;
}

interface tableData {
  srno: number;
  teamid: string;
  teamname: string;
  leader: string;
  rollno: string[];
  members: string[];
  domains: string[];
  priorityGuides: string[];
  assignedReviewers: string[];
  assignedGuide: string[];
  status?: boolean;
}

const tableHeader = [
  { label: "Sr no.", key: "srno" },
  { label: "Team ID", key: "teamid" },
  { label: "Team Name", key: "teamname" },
  { label: "Leader", key: "leader" },
  { label: "Roll No.", key: "rollno" },
  { label: "Members", key: "members" },
  { label: "Domains", key: "domains" },
  { label: "Priority Guides", key: "priorityGuides" },
  { label: "Assigned Reviewers", key: "assignedReviewers" },
  { label: "Assigned Guide", key: "assignedGuide" },
  { label: "Status", key: "status" },
];
function ShowTeams() {
  const [teams, setTeams] = useState<teamType[]>([]);
  const [guides, setGuides] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState<Option[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<string>("");
  const [update, setUpdate] = useState(0);
  const [table, setTable] = useState<tableData[]>([]);

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
                  {
                    firstname: string;
                    lastname: string;
                    salutation: string;
                    _id: string;
                  }
                ];
                assignedReviewer: [
                  {
                    firstname: string;
                    lastname: string;
                    salutation: string;
                    _id: string;
                  }
                ];
                assignedGuide: [
                  {
                    firstname: string;
                    lastname: string;
                    salutation: string;
                    _id: string;
                  }
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
                      name:
                        guide.salutation +
                        " " +
                        guide.firstname +
                        " " +
                        guide.lastname,
                    };
                  }),
                  status: team.assignedReviewer?.length > 0 ? true : false,
                  assignedReviewers:
                    team.assignedReviewer?.length > 0
                      ? team.assignedReviewer?.map((guide) => {
                          return {
                            id: guide._id,
                            name:
                              guide.salutation +
                              " " +
                              guide.firstname +
                              " " +
                              guide.lastname,
                          };
                        })
                      : [],
                  assignedGuide:
                    team.assignedGuide?.length > 0
                      ? team.assignedGuide?.map((guide) => {
                          return {
                            id: guide._id,
                            name:
                              guide.salutation +
                              " " +
                              guide.firstname +
                              " " +
                              guide.lastname,
                          };
                        })
                      : [],
                };
              }
            );

            // console.log(allTeams);
            setTeams(allTeams);

            const tabledata = allTeams.map((team: teamType, index: number) => {
              return {
                srno: index + 1,
                teamid: team.teamid,
                teamname: team.teamname,
                leader: team.leader,
                rollno: team.members.map((member) => {
                  return member.rollno;
                }),
                members: team.members.map((member) => {
                  return member.name;
                }),
                domains: team.domains.map((domain) => {
                  return domain.name;
                }),
                priorityGuides: team.priorityGuides.map((guide) => {
                  return guide.name;
                }),
                assignedReviewers:
                  team.assignedReviewers.length > 0
                    ? team.assignedReviewers.map((guide) => {
                        return guide.name;
                      })
                    : [],
                assignedGuide:
                  team.assignedGuide.length > 0
                    ? team.assignedGuide.map((guide) => {
                        return guide.name;
                      })
                    : [],
                status: team.status,
              };
            });

            setTable(tabledata);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update, setUpdate]);

  const approve = (
    e: MouseEvent,
    id: string,
    guide: string,
    reviewers: Option[]
  ) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth_token"),
    };

    if (!selectedGuide) {
      Notify("error", "Please select a guide");
      return;
    }

    if (!selectedReviewer) {
      Notify("error", "Please select a reviewer");
      return;
    }
    const data = {
      teamid: id,
      guide: guide,
      reviewers: reviewers.map((guide: { value: string }) => guide.value),
    };

    console.log(data);
    axios
      .post("/api/v1/team/approveteam", data, { headers })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setUpdate((prev) => prev + 1);
          Notify("success", "Team accepted");
          setSelectedGuide("");
          setSelectedReviewer([]);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          setUpdate((prev) => prev + 1);
          Notify("success", "Team rejected");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadPDF = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
    autoTable(doc, { html: "#mytable" });
    // const tHead = [
    //   "Sr. no.",
    //   "Team ID",
    //   "Team Name",
    //   "Team Leader",
    //   "Roll no.",
    //   "Members",
    //   "Domains",
    //   "Priority Guides",
    //   "Assigned Reviewers",
    //   "Assigned Guide",
    //   "Status",
    // ];
    // autoTable(doc, { head: [tHead], body: [table] });
    doc.save("table.pdf");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl capitalize font-semibold">All Teams</h1>
        <Separator className="my-4 bg-black" />
        <div className="flex gap-4 items-center my-8 justify-end">
          <Button>
            <CSVLink data={table} headers={tableHeader}>
              Download CSV
            </CSVLink>
          </Button>
          <Button className="bg-green-500" onClick={downloadPDF}>
            Download PDF
          </Button>
        </div>
        <Table id="mytable">
          <TableCaption>List of teams formed</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="uppercase">Sr. no.</TableHead>
              <TableHead className="uppercase">Teamid</TableHead>
              <TableHead className="uppercase">Team name</TableHead>
              <TableHead className="uppercase">Leader</TableHead>
              <TableHead className="uppercase">Roll no.</TableHead>
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
              ? teams?.map((team: teamType, index: number) => {
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {team.teamid}
                      </TableCell>
                      <TableCell className="font-medium">
                        {team.teamname}
                      </TableCell>
                      <TableCell>{team.leader}</TableCell>
                      <TableCell>
                        <Table>
                          {team.members?.map((member: member) => {
                            return (
                              <>
                                <TableRow
                                  key={member.id}
                                  // className="flex flex-col items-center space-x-2"
                                >
                                  {member.rollno}
                                </TableRow>
                              </>
                            );
                          })}
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table>
                          {team.members?.map((member: member) => {
                            return (
                              <>
                                <TableRow
                                  key={member.id}
                                  // className="flex flex-col items-center space-x-2"
                                >
                                  {member.name}
                                </TableRow>
                              </>
                            );
                          })}
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table>
                          {team.domains?.map((domain: pair) => {
                            return (
                              <TableRow key={domain.id}>
                                <TableCell>{domain.name}</TableCell>
                              </TableRow>
                            );
                          })}
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table>
                          {team.assignedGuide?.length == 0 ? (
                            team.priorityGuides?.map((guide: pair) => {
                              return (
                                <TableRow key={guide.id}>
                                  <TableCell>{guide.name}</TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow className="flex items-center space-x-2">
                              <TableCell>
                                {team.assignedGuide[0].name}
                              </TableCell>
                            </TableRow>
                          )}
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table>
                          {team.assignedReviewers?.length > 0 ? (
                            team.assignedReviewers.map((guide: pair) => {
                              return (
                                <TableRow key={guide.id}>
                                  <TableCell>{guide.name}</TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow className="text-center">
                              <TableCell>No reviewers assigned yet</TableCell>
                            </TableRow>
                          )}
                        </Table>
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
                                <Select
                                  onValueChange={(val) => setSelectedGuide(val)}
                                >
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
                              <Button
                                size="sm"
                                className="bg-green-500"
                                onClick={(e) =>
                                  approve(
                                    e,
                                    team.id,
                                    selectedGuide,
                                    selectedReviewer
                                  )
                                }
                              >
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
