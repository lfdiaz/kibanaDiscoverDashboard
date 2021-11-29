import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Box,
  Collapse,
  TableBody,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppSelector } from "../../app/hooks";
import { getSelectedHeaders, getElasticData } from "./elasticSlice";

/*

TODO: Add Pagination, Sorting and Filtering

*/
const DetailsTable: FC = () => {
  const selectedHeaders = useAppSelector(getSelectedHeaders);
  const data = useAppSelector(getElasticData);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Time</TableCell>
            {selectedHeaders.map((header: string) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody data-testid="dashboard-table-body">
          {data.map((row, i) => (
            <Row
              row={row}
              selectedHeaders={selectedHeaders}
              key={row["_source.timestamp"]}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type RowType = { [key: string]: string };

const Row: FC<{ row: RowType; selectedHeaders: Array<string> }> = ({
  selectedHeaders,
  row,
}) => {
  const [open, setOpen] = React.useState(false);

  const onExpand = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={onExpand}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row["_source.timestamp"]}</TableCell>
        {selectedHeaders.map((header: string) => (
          <TableCell key={header}>{row[header]}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse unmountOnExit timeout="auto" in={open}>
            <Box display="flex" flexDirection="column">
              {Object.keys(row).map((k, i) => (
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 1fr"
                  key={`${i}-${k}`}
                >
                  <Typography textAlign="center" variant="subtitle1">
                    {k}
                  </Typography>
                  <Typography variant="subtitle2">{row[k]}</Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DetailsTable;
