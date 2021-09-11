const CustomerDetail = ({ customer }:any) => {
    return (
        <div className="right-side">
            <div className="form-signin" style={{ maxWidth: '50%' ,margin:0 }}>
                <div className="card shadow-sm">
                    <div className="card-header fw-bold">Customer Details</div>
                    <div className="card-body p-4 row mb-3">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="email">Customer Name</label>
                            <div className="form-control col-md-1">{customer.customerName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="email">Email</label>
                            <div className="form-control col-md-1">{customer.email}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Phone</label>
                            <div className="form-control col-md-1">{customer.phone}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="Country">Country</label>
                            <div className="form-control col-md-1">{customer.country}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Additional Info</label>
                            <div className="form-control col-md-1">{customer.additionalInfo}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Uplaod File</label>
                            <a href={customer.pdfURL} target="_blank"> { customer.fileName}<i className="bi bi-download p-2"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail
