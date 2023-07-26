import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Link, Typography, Button, Stack } from "@mui/material";
import Dot from "../Dot";
import TransitionsModal from "./WarningComp";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

function DataList({ meatList, pageProp, setDelete }) {
  const [page, setPage] = useState("list");
  useEffect(() => {
    setPage(pageProp);
  }, [pageProp]);

  // 삭제 체크박스
  //checkboxItems에 체크박스 추가
  let checkboxes = {};
  meatList.forEach((content) => {
    checkboxes = { ...checkboxes, [content.id]: false };
  });
  const [checkboxItems, setCheckboxItems] = useState(checkboxes);
  const [selectAll, setSelectAll] = useState(false);

  // 전체 선택을 누를 경우
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    // 전체 체크박스의 체크 상태 한가지로 업데이트
    setCheckboxItems(
      Object.keys(checkboxItems).reduce((acc, checkbox) => {
        acc[checkbox] = isChecked;
        return acc;
      }, {})
    );
  };

  // 한 개 선택을 누를 경우
  const handleCheckBoxChange = (event) => {
    setCheckboxItems({
      ...checkboxItems,
      [event.target.value]: event.target.checked,
    });
  };

  // 전체가 선택/해제되었을 경우 select all 체크박스 업데이트
  useEffect(() => {
    const allChecked = Object.values(checkboxItems).every((value) => value);
    setSelectAll(allChecked);
  }, [checkboxItems]);

  // 부모로 삭제할 데이터 전달
  useEffect(() => {
    let checkedList = [];
    Object.entries(checkboxItems).forEach((c) => {
      const id = c[0];
      const checked = c[1];
      if (checked) {
        checkedList.push(id);
      }
    });
    if (typeof setDelete === "function") {
      setDelete(checkedList);
    }
  }, [checkboxItems]);

  // 리스트에 있는 삭제 버튼 클릭 시
  const [isDelClick, setIsDelClick] = useState(false);
  const [delId, setDelId] = useState(null);
  const handleDelete = (id) => {
    setIsDelClick(true);
    setDelId(id);
  };

  // Define the columns for the DataGrid
  const columns = [
    {
      field: "id",
      headerName: "No.",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "trackingNo",
      headerName: "관리번호",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "farmAddr",
      headerName: "농장주소",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "userName",
      headerName: "등록인",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "userType",
      headerName: "등록인 타입",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "company",
      headerName: "소속",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "meatCreatedAt",
      headerName: "생성 날짜",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "accepted",
      headerName: "승인 여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <OrderStatus status={params.value} />,
    },
    {
      field: "button",
      headerName: "검토",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Link
          color="#000000"
          component={RouterLink}
          to={{ pathname: "/DataConfirm" }}
        >
          <Button>검토</Button>
        </Link>
      ),
    },
    {
      field: "protein",
      headerName: "삭제",
      flex: 1,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // 테이블 상태 컴포넌트
  const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
      case "rejected":
        color = "error";
        title = "반려";
        break;
      case "accepted":
        color = "success";
        title = "승인";
        break;
      case "stand-by":
        color = "secondary";
        title = "대기";
        break;
      default:
        color = "primary";
        title = "None";
    }

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Dot color={color} />
        <Typography>{title}</Typography>
      </Stack>
    );
  };

  OrderStatus.propTypes = {
    status: PropTypes.string,
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        sx={{
          p: 2,
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <DataGrid
            rows={meatList.map((content, index) => ({
              ...content,
              id: index + 1,
            }))}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
              // Handle selection changes here if needed
              console.log(newSelection);
            }}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            loading={false} // Set this to true when data is loading
          />
          {isDelClick ? (
            <TransitionsModal id={delId} setIsDelClick={setIsDelClick} />
          ) : (
            <></>
          )}
        </div>
      </Paper>
    </Container>
  );
}

export default DataList;
