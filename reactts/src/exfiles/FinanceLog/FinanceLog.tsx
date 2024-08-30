import React, { useEffect, useState } from "react";
import "./FinanceLog.css";
interface LogsItem {
    Type: String,
    Details: String,
    Amount: String,
    id: Number,
    TotalInvoice: Number,
    TotalPayment: Number
}
function FinanceLog() {
    const [Type, SetType] = useState('Invoice')
    const [Details, SetDetails] = useState('')
    const [Amount, SetAmount] = useState('')
    const [List, SetList] = useState<LogsItem[]>([])
    const [TotalInvoice, SetITotal] = useState(0)
    const [TotalPayment, SetPTotal] = useState(0)
    const [EditMode, SetEditMode] = useState(false)
    const [EditLog, SetEditLog] = useState<LogsItem | null>(null)
    const handleEvent = () => {
        const NewItem =
        {
            Type,
            Details,
            Amount,
            id: Date.now(),
            TotalInvoice,
            TotalPayment
        }
        const ParseAmount = (Value: String): number => { const ConvAmount = Value.replace(/,/g, ''); return parseFloat(ConvAmount) }
        const ConvAmount = ParseAmount(Amount)
        if (!isNaN(ConvAmount)) {
            if (EditLog && EditMode) {
                const OldAmount = ParseAmount(EditLog.Amount)
                const UpdateLog = List.map((Logs) => Logs == EditLog ? { ...NewItem, id: EditLog.id } : Logs)
                SetList(UpdateLog)
                if (EditLog.Type === 'Invoice') SetITotal((PerValue) => PerValue - OldAmount + ConvAmount)
                else SetPTotal((PerValue) => PerValue - OldAmount + ConvAmount)
                SetEditMode(false)
                SetEditLog(null)
            }
            else {
                SetList((PervList) => [...PervList, { ...NewItem, id: Date.now() }])
                if (Type === 'Invoice') SetITotal((PerValue) => PerValue + ConvAmount)
                else SetPTotal((PerValue) => PerValue + ConvAmount)
            }
        }
        else {
            alert('Enter the Valid Amount')
            SetType('Invoice')
            SetDetails('')
            SetAmount('')
        }
        SetType('Invoice')
        SetDetails('')
        SetAmount('')
    }
    const HandleEdit = (Logs: any) => {
        alert('EditMode: On')
        SetEditMode(true)
        SetEditLog(Logs)
        SetType(Logs.Type)
        SetDetails(Logs.Details)
        SetAmount(Logs.Amount)
    }
    return (
        <>
            <h2>FinanceLogs</h2><br />
            <div id="input-panel">
                <label htmlFor="Type" className="label-style">Type:</label>
                <label htmlFor="Details" className="label-style">Details:</label>
                <label htmlFor="Amount" className="label-style">Amount:</label><br />
                <select name="type" id="Type" className="input-style" onChange={(event1) => SetType(event1.target.value)}>
                    <option value="Invoice" selected>Invoice</option>
                    <option value="Payment">Payment</option>
                </select>
                <input type="text" id="Details" value={Details} placeholder="Enter Product" className="input-style" onChange={(event2) => SetDetails(event2.target.value)} />
                <input type="text" id="Amount" value={Amount} placeholder="Enter Price" className="input-style" onChange={(event3) => SetAmount(event3.target.value)} />
                <button onClick={() => handleEvent()} className="submit-btn">Submit</button>
            </div>
            <ul>
                {
                    List.map((Logs) => (
                        <li key={String(Logs.id)}>{Logs.Type == 'Invoice' ? 'Invoice' : 'Payment'}:<br />
                            <ul>
                                <li>Product Details: {Logs.Details}</li>
                                <li>Amount: {Logs.Amount.toLocaleString()}</li>
                            </ul>
                            <button onClick={() => HandleEdit(Logs)} className="edit-btn"><img src="/EditIcon.png" alt="EditIcon" />Edit</button>
                        </li>
                    ))
                }
            </ul>
            <div id="total-panel">
                <span className="total-panel-data">Invoice Total : {TotalInvoice.toLocaleString()}</span>
                <span className="total-panel-data">Payments Total : {TotalPayment.toLocaleString()}</span>
                <span className="total-panel-data">Outstanding Amount:{TotalInvoice - TotalPayment > 0 ? (TotalInvoice - TotalPayment).toLocaleString() : '-'}</span>
            </div>
        </>
    )
}

export default FinanceLog;
