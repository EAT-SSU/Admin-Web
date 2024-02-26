import React, { useState, useEffect } from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Modal, Button, DialogActions } from '@mui/material';
import './Inquiry.css';
import { styled } from '@mui/material/styles';
import { sendAuthorizedHttpRequest } from '../../api/api';
import RoundedButton from 'components/RoundedButton';
import DeleteConfirmModal from 'components/DeleteConfirmModal';
import ModifyStatusModal from './ModifyStatusModal';

const Inquiry = () => {

    const [inquiries, setInquiries] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isInquiryTextModalOpen, setIsInquiryTextModalOpen] = useState(false);
    const [isDeleteInquiryModalOpen, setIsDeleteInquiryModalOpen] = useState(false);
    const [isModifyInquiryStatusModalOpen, setIsModifyInquiryStatusModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);

    useEffect(() => {
        fetchReportsData();
    }, []);

    const fetchReportsData = async () => {
        try {
            console.log("fetchReportsData");
            setIsLoading(true);
            const response =
                await sendAuthorizedHttpRequest('get', `/inquiries`);
            setInquiries(response.result.content);
            console.log(inquiries);
            setIsLoading(inquiries);
        } catch (error) {
            console.error('Error fetching menu:', error);
            setIsLoading(true);
        }
    };


    const handleContentClick = (inquiryContent, inquiryId) => {
        setSelectedContent(inquiryContent);
        setSelectedInquiryId(inquiryId);
        console.log(selectedInquiryId);
        setIsInquiryTextModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsInquiryTextModalOpen(false);
    }


    const handleModifyInquiryStatus = async (status) => {
        setIsModifyInquiryStatusModalOpen(false);
        console.log(selectedInquiryId);
        await sendAuthorizedHttpRequest('patch', `/inquiries/${selectedInquiryId}/status`, { status: status });
        fetchReportsData();
    }

    const handleClickMofidyStatusInquiry = (inquiryId) => {
        setSelectedInquiryId(inquiryId);
        setIsModifyInquiryStatusModalOpen(true);
    }

    const handleCloseModifyInquiryStatusModal = () => {
        setIsModifyInquiryStatusModalOpen(false);
    }

    const handleClickDeleteInquiry = (inquiryId) => {
        setSelectedInquiryId(inquiryId);
        setIsDeleteInquiryModalOpen(true);
    }
    const handleCloseDeleteInquiryModal = () => {
        setIsDeleteInquiryModalOpen(false);
    }

    const handleDeleteInquiry = async () => {
        setIsDeleteInquiryModalOpen(false);
        setIsInquiryTextModalOpen(false);
        await sendAuthorizedHttpRequest('delete', `/inquiries/${selectedInquiryId}`);
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
                            <TableCell style={{ width: '20%' }}>문의날짜</TableCell>
                            <TableCell style={{ width: '20%' }}>이메일</TableCell>
                            <TableCell style={{ width: '20%' }}>문의내용</TableCell>
                            <TableCell style={{ width: '20%' }}>상태</TableCell>
                            <TableCell style={{ width: '20%' }}>처리</TableCell>
                        </CustomTableRow>
                    </TableHead>
                    <TableBody>
                        {inquiries.map((inquiry) => (
                            <TableRow key={inquiry.inquiryId}>
                                <CustomTableCell>{inquiry.inquiryId}</CustomTableCell>
                                <CustomTableCell>{inquiry.date}</CustomTableCell>
                                <CustomTableCell>{inquiry.email}</CustomTableCell>
                                <CustomTableCell className={'limitedText buttonText'}>
                                    <p onClick={() => handleContentClick(inquiry.content, inquiry.inquiryId)} >
                                        {inquiry.content}
                                    </p>
                                </CustomTableCell>
                                <CustomTableCell>{inquiry.status}</CustomTableCell>
                                <CustomTableCell className='buttonContainer'>
                                    <RoundedButton onClick={() => handleClickMofidyStatusInquiry(inquiry.inquiryId)}> 상태 변경 </RoundedButton>
                                    <RoundedButton onClick={() => handleClickDeleteInquiry(inquiry.inquiryId)}> 문의 삭제 </RoundedButton>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={isInquiryTextModalOpen} onClose={handleCloseModal}>
                <div className='modalContainer'>
                    <h2>문의 내용</h2>
                    <Typography >{selectedContent}</Typography>
                    <DialogActions>
                        <Button onClick={setIsModifyInquiryStatusModalOpen} color="primary">
                            상태 변경
                        </Button>
                        <Button variant="contained" onClick={setIsDeleteInquiryModalOpen} color="secondary" autoFocus>
                            문의 삭제
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal} color="grey">
                            닫기
                        </Button>
                    </DialogActions>
                </div>
            </Modal>
            <DeleteConfirmModal open={isDeleteInquiryModalOpen} handleCancel={handleCloseDeleteInquiryModal} handleConfirm={handleDeleteInquiry}>
            </DeleteConfirmModal>
            <ModifyStatusModal open={isModifyInquiryStatusModalOpen} handleClose={handleCloseModifyInquiryStatusModal} handleModify={handleModifyInquiryStatus}>
            </ModifyStatusModal>
        </div>
    );
};

export default Inquiry;
