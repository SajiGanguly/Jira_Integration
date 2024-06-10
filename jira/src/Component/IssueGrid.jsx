import { React, useState, useEffect } from "react";
import fetchIssueFromProject from "../APICall/IssueApi";
import { DataGrid } from "@mui/x-data-grid";
import { CssBaseline } from "@mui/material";
import crossImage from "../assets/close.png";
function IssueGrid({ apiurl }) {
  const [rows, setRows] = useState([]);
  const [projectIcon, setProjectIcon] = useState("");
  const [creatoricon, setCreatorIcon] = useState("");
  const [reporterIcon, setReporterIcon] = useState("");
  const [assigneeIcon, setAssigneeIcon] = useState("");

 


  const renderImageCell = (params) => {
    return <img src={params.value} style={{ width: 50, height: 50 }} />;
  };
  const [columns, setColumns] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 90,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueKey",
      headerName: "Key",
      width: 80,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueName",
      headerName: "Name",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueType",
      headerName: "Type",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueDescription",
      headerName: "Description",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueDueDate",
      headerName: "Due Date",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueLastUpdate",
      headerName: "Last Update",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "project",
      headerName: "Project",
      width: 200,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "projectIcon",
      headerName: "Project Profile",
      flex: 1,
      minWidth:150,
      align: "center",
      headerAlign: "center",
      renderCell: renderImageCell,
    },
    {
      field: "issueCreator",
      headerName: "Creator",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueAssignee",
      headerName: "Assignee",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueReporter",
      headerName: "Reporter",
      width: 130,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issuePriority",
      headerName: "Priority",
      width: 120,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueStatus",
      headerName: "Status",
      width: 100,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueResolutionDate",
      headerName: "Resolution Date",
      width: 150,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueProgeress",
      headerName: "Progress",
      width: 100,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "issueParent",
      headerName: "Parent",
      width: 100,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 100,
      allign: "center",
      headerAllign: "center",
    },
    {
      field: "timeSpent",
      headerName: "Time Spent",
      width: 100,
      allign: "center",
      headerAllign: "center",
    },

    {
      field: "creatorIcon",
      headerName: "Creator Profile",
      flex: 1,
      minWidth:150,
      align: "center",
      headerAlign: "center",
      renderCell: renderImageCell,
    },
    {
      field: "reporterIcon",
      headerName: "Reporter Profile",
      flex: 1,
      minWidth:150,
      align: "center",
      headerAlign: "center",
      renderCell: renderImageCell,
    },
    {
      field: "assigneeIcon",
      headerName: "Assignee Profile",
      flex: 1,
      minWidth:150,
      align: "center",
      headerAlign: "center",
      renderCell: renderImageCell,
    },
  ]);

  useEffect(() => {
    console.log("Fetching data...", apiurl);
    fetchIssueFromProject(apiurl)
      .then((data) => {
        const mappedData = data.map((row) => {
          return {
            id: row.issueId,
            issueKey: row.issueKey,
            issueName: row.issueName,
            issueType: row.issueType,
            issueDescription: row.issueDescription ? row.issueDescription : "-",
            issueDueDate: row.issueDueDate ? row.issueDueDate : "-",
            issueLastUpdate: row.issueUpdated,
            project: row.project.projectName,
            issueCreator: row.issueCreator.creatorName,
            issueAssignee: row.issueAssignee
              ? row.issueAssignee.assigneeName
              : "Unassigned",
            issueReporter: row.issueReporter.reporterName,
            issuePriority: row.issuePriority,
            issueStatus: row.issueStatus.statusName,
            issueResolutionDate: row.issueResolutionDate,
            issueProgeress: row.issueProgress.progress,
            issueParent: row.issueParent
              ? row.issueParent.parentName
              : "No Parent",
            createdDate: row.issueCreated,
            timeSpent: row.timeSpent ? row.timeSpent : "No Time Spent",
            projectIcon: row.project.avatarUrl.url,
            creatorIcon: row.issueCreator.creatorAvatar.url,
            reporterIcon: row.issueReporter.reporterAvatar.url,
            assigneeIcon: row.issueAssignee
              ? row.issueAssignee.assigneeAvatar.url
              : crossImage,
          };
        });
        setRows(mappedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log("Rows:", rows);
  return (
    <>
      <CssBaseline />

      <div style={{ height: 350, width: "90%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </>
  );
}

export default IssueGrid;
