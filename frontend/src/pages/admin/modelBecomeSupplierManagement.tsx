import React, { useEffect, useState } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material'
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Receipt as ReceiptIcon,
  Badge as BadgeIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { request } from '../../model/request'
import api from '../../../API/api'
import { formatUrlImg } from '../../utils/urlFormat'

interface ModalBecomeSupplierManagementProp {
  open: boolean
  onClose: () => void
  id?: string,
}

 const ModalBecomeSupplierManagement: React.FC<ModalBecomeSupplierManagementProp> = ({ onClose, open, id }) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [request,setRequest] = useState<request>()
  useEffect(()=>{
    console.log(id)
    if(!id){
      return;
    }

    api.get("/admin/DetailRequestBecomeSupplier",{
      params:{
        id:id
      }
    }).then((res)=>{
      setRequest(res.data.data)
      console.log("sss",res)
    })
  },[id])

 

  
  

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if(!request){
    return
  }

  const renderDocumentsTable = () => (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên tài liệu</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Ngày upload</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {request.other_Document_supplier?.map((doc, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <AttachFileIcon fontSize="small" color="action" />
                  <Typography variant="body2">{doc.file_url || `Tài liệu ${index + 1}`}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="caption" color="text.secondary">
                  {doc.create_at ? formatDate(doc.create_at) : 'N/A'}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => window.open(formatUrlImg(doc.file_url), '_blank')}
                >
                  Xem
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.50', 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <BusinessIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {request?.company_name || 'N/A'}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              {/* <Chip
                label={statusConfig.label}
                color={statusConfig.color as any}
                icon={statusConfig.icon}
                size="small"
                sx={{ fontWeight: 'bold' }}
              /> */}
              <Typography variant="caption" color="text.secondary">
                ID: {request?.id?.slice(0, 8)}...
              </Typography>
            </Box>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)} 
          sx={{ mb: 3 }}
        >
          <Tab label="Thông tin chung" />
          <Tab label="Tài liệu" />
        </Tabs>


        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                    <PersonIcon />
                    Thông tin liên hệ
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Người liên hệ" 
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {request?.person?.name || request?.person?.email?.split('@')[0] || 'N/A'}
                          </Typography>
                        } 
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={
                          <Typography variant="body1" color="primary.main">
                            {request.person?.email || 'N/A'}
                          </Typography>
                        } 
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Số điện thoại" 
                        secondary={
                          <Typography variant="body1">
                            {request.person?.phone || 'N/A'}
                          </Typography>
                        } 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                    <BusinessIcon />
                    Thông tin doanh nghiệp
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Mã số thuế" 
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {request.tax_code || 'Không có'}
                          </Typography>
                        } 
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ngày gửi yêu cầu" 
                        secondary={
                          <Typography variant="body1" fontWeight="medium">
                            {request.create_at ? formatDate(request.create_at) : 'N/A'}
                          </Typography>
                        } 
                      />
                    </ListItem>
                    <Divider />
                    {request.process_at && (
                      <>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarIcon color="action" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Ngày xử lý" 
                            secondary={
                              <Typography variant="body1" fontWeight="medium">
                                {formatDate(request.process_at)}
                              </Typography>
                            } 
                          />
                        </ListItem>
                        <Divider />
                      </>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Địa chỉ */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                    <LocationIcon />
                    Địa chỉ
                  </Typography>
                  
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body1" paragraph>
                      {request.service?.location?.location || 'N/A'}
                    </Typography>
                    {request.service?.location?.ward && (
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip 
                          label={request.service.location.ward.name || 'N/A'} 
                          size="small" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={request.service.location.ward.fullName || 'N/A'} 
                          size="small" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={request.service.location.ward.province.fullName || 'N/A'} 
                          size="small" 
                          variant="outlined" 
                          color="primary"
                        />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tab 2: Tài liệu */}
        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                <AttachFileIcon />
                Tài liệu đính kèm ({request.other_Document_supplier?.length || 0})
              </Typography>
              
              {request.other_Document_supplier && request.other_Document_supplier.length > 0 ? (
                renderDocumentsTable()
              ) : (
                <Alert severity="info">
                  Không có tài liệu đính kèm
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

      </DialogContent>

      <DialogActions sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider', 
        bgcolor: 'grey.50' 
      }}>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Chi tiết yêu cầu #{request.id?.slice(0, 8)}...
          </Typography>
          <Box display="flex" gap={1}>
            <Button onClick={onClose} variant="outlined">
              Đóng
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ModalBecomeSupplierManagement