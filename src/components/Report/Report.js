import React, { useState, useEffect } from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Modal, Button, DialogActions } from '@mui/material';
import './Report.css';
import { styled } from '@mui/material/styles';
import { sendAuthorizedHttpRequest } from '../../api/api';
import RoundedButton from 'components/RoundedButton';
import DeleteConfirmModal from 'components/DeleteConfirmModal';

const Report = () => {

    const [reports, setReports] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isReviewTextModalOpen, setIsReviewTextModalOpen] = useState(false);
    const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
    const [isDeleteReportModalOpen, setIsDeleteReportModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    useEffect(() => {
        fetchReportsData();
    }, []);

    const fetchReportsData = async () => {
        try {
            console.log("fetchReportsData");
            setIsLoading(true);
            const response =
                await sendAuthorizedHttpRequest('get', `/reports`);
            setReports(response.result.content);
            console.log(reports);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching menu:', error);
            setIsLoading(true);
        }
    };


    const handleContentClick = (reviewContent, reportId, reviewId) => {
        setSelectedContent(reviewContent);
        setSelectedReportId(reportId);
        setSelectedReviewId(reviewId);
        setIsReviewTextModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsReviewTextModalOpen(false);
    }


    const handleDeleteReport = async () => {
        setIsReviewTextModalOpen(false);
        setIsDeleteReportModalOpen(false);
        await sendAuthorizedHttpRequest('delete', `/reports/${selectedReportId}`);
        fetchReportsData();
    }

    const handleClickDeleteReport = (reportId) => {
        setSelectedReportId(reportId);
        setIsDeleteReportModalOpen(true);
    }

    const handleCloseDeleteReportModal = () => {
        setIsDeleteReportModalOpen(false);
    }

    const handleClickDeleteReview = (reviewId) => {
        setSelectedReviewId(reviewId);
        setIsDeleteReviewModalOpen(true);
    }
    const handleCloseDeleteReviewModal = () => {
        setIsDeleteReviewModalOpen(false);
    }

    const handleDeleteReview = async () => {
        setIsDeleteReviewModalOpen(false);
        await sendAuthorizedHttpRequest('delete', `/reviews/${selectedReviewId}`);
        fetchReportsData();
    }




    const CustomTableRow = styled(TableRow)({
        borderBottom: '1px solid #A8A8A8',
        borderTop: '2px solid #A8A8A8',
        '& .MuiTableCell-root': {
            fontWeight: '600',
            textAlign: 'center',
        },
    });

    const CustomTableCell = styled(TableCell)({
        textAlign: 'center',
        padding: '0.2rem',
    });


    return (
        <div className='tableContainer'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <CustomTableRow>
                            <TableCell style={{ width: '5%' }}>번호</TableCell>
                            <TableCell style={{ width: '20%' }}>신고날짜</TableCell>
                            <TableCell style={{ width: '20%' }}>신고사유</TableCell>
                            <TableCell style={{ width: '35%' }}>리뷰내용</TableCell>
                            <TableCell style={{ width: '20%' }}>처리상태</TableCell>
                        </CustomTableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.reportId}>
                                <CustomTableCell>{report.reportId}</CustomTableCell>
                                <CustomTableCell>{report.date}</CustomTableCell>
                                <CustomTableCell>{report.type}</CustomTableCell>
                                <CustomTableCell className={'limitedText buttonText'}>
                                    <p onClick={() => handleContentClick(report.reviewText, report.reportId, report.reviewId)} >
                                        {report.reviewText}
                                    </p>
                                </CustomTableCell>
                                <CustomTableCell className='buttonContainer'>
                                    <RoundedButton onClick={() => handleClickDeleteReport(report.reportId)}> 신고 무시 </RoundedButton>
                                    <RoundedButton onClick={() => handleClickDeleteReview(report.reviewId)}> 리뷰 삭제 </RoundedButton>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={isReviewTextModalOpen} onClose={handleCloseModal}>
                <div className='modalContainer'>
                    <h2>신고 당한 리뷰 내용</h2>
                    <Typography >{selectedContent}</Typography>
                    <DialogActions>
                        <Button onClick={setIsDeleteReportModalOpen} color="primary">
                            신고 무시
                        </Button>
                        <Button variant="contained" onClick={setIsDeleteReviewModalOpen} color="secondary" autoFocus>
                            리뷰 삭제
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal} color="grey">
                            닫기
                        </Button>
                    </DialogActions>
                </div>
            </Modal>
            <DeleteConfirmModal open={isDeleteReviewModalOpen} handleCancel={handleCloseDeleteReviewModal} handleConfirm={handleDeleteReview}>
            </DeleteConfirmModal>
            <DeleteConfirmModal open={isDeleteReportModalOpen} handleCancel={handleCloseDeleteReportModal} handleConfirm={handleDeleteReport}>
            </DeleteConfirmModal>
        </div>
    );
};

export default Report;
