import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const theme = createTheme(
  "inc_table_dark",
  {
    text: {
      primary: "rgba(37, 99, 235, 0.9)",
      secondary: "rgba(37, 99, 235, 0.6)",
    },
    background: {
      default: "transparent",
    },
    context: {
      text: "rgb(209, 213, 219)",
    },
    button: {
      color: "rgb(209, 213, 219)",
      fill: "rgb(209, 213, 219)",
      "&:focus": {
        backgroundColor: "rgba(37, 99, 235, 0.9)",
      },
    },
    highlightOnHover: {
      default: "rgba(7, 89, 133, 0.4)",
      text: "rgb(209, 213, 219)",
    },
    striped: {
      default: "rgba(7, 89, 133, .4)",
      text: "rgb(209, 213, 219)",
    },
  },
  "dark"
);

const customStyles = {
  table: {
    style: {
      border: "1px solid rgba(7, 89, 133, .9)",
      borderRadius: "0.75rem",
      color: "#FFFFFF", // Text color
      backgroundColor: "rgba(7, 89, 133, .15)", // Table background color
    },
  },
  headRow: {
    style: {
      backgroundColor: "rgba(7, 89, 133, 0.3)",
      fontSize: "1.05rem",
      minHeight: "52px",
      borderRadius: "0.75rem",
      marginBottom: "4px",
      borderBottom: "1px solid rgba(7, 89, 133, 0.9)",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      color: "rgba(200, 162, 13, 0.9)",
      whiteSpace: "normal",
    },
    draggingStyle: {
      cursor: "move",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      wordBreak: "break-word",
    },
  },
  rows: {
    style: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.8px",
      backgroundColor: "rgba(7, 89, 133, .15)",
      minHeight: "1.75rem",
      borderBottom: "2px solid rgba(255, 255, 255, 0.5)", // Border color
    },
    denseStyle: {
      minHeight: "1.75rem",
    },
    highlightOnHoverStyle: {
      color: "#FFFFFF", // Text color on hover
      backgroundColor: "rgba(7, 89, 133, .4)", // Background color on hover
      borderBottomColor: "rgba(255, 255, 255, 0.5)", // Border color on hover
    },
  },
  pagination: {
    style: {
      color: "#FFFFFF", // Text color
      fontSize: "0.9rem",
      minHeight: "2rem",
      backgroundColor: "rgba(7, 89, 133, 0.25)",
      border: "1px solid rgba(7, 89, 133, 0.9)",
      borderTop: "none",
      borderRadius: "0 0 0.75rem 0.75rem",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: "#FFFFFF", // Text color for page buttons
      fill: "#FFFFFF", // Fill color for page buttons
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "rgba(255, 255, 255, 0.5)", // Disabled text color for page buttons
        fill: "rgba(255, 255, 255, 0.5)", // Disabled fill color for page buttons
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Background color on hover for page buttons
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Background color on focus for page buttons
      },
    },
  },
};

function TableComponent(props) {
  return (
    <div className={props.outerClassName}>
      <DataTableExtensions {...props} fileName={props.title} exportHeaders>
        <DataTable
          {...props}
          pagination={props.pagination === false ? false : true}
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          theme="inc_table_dark"
          progressPending={props.loading}
          customStyles={customStyles}
        />
      </DataTableExtensions>
    </div>
  );
}

export default TableComponent;
