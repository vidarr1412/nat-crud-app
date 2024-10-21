
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onSave, record, setRecord }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Record</h2>
        <form>
          <input
            type="text"
            value={record.Respondents}
            onChange={(e) => setRecord({ ...record, Respondents: e.target.value })}
            placeholder="Respondents"
            required
          />
          <input
            type="number"
            value={record.age}
            onChange={(e) => setRecord({ ...record, age: e.target.value })}
            placeholder="Age"
            required
          />
          <input
            type="text"
            value={record.sex}
            onChange={(e) => setRecord({ ...record, sex: e.target.value })}
            placeholder="Sex"
            required
          />
          <input
            type="text"
            value={record.Ethnic}
            onChange={(e) => setRecord({ ...record, Ethnic: e.target.value })}
            placeholder="Ethnic"
            required
          />
          <input
            type="text"
            value={record.academic_perfromance}
            onChange={(e) => setRecord({ ...record, academic_perfromance: e.target.value })}
            placeholder="Academic Performance"
            required
          />
          <input
            type="text"
            value={record.adamemic_description}
            onChange={(e) => setRecord({ ...record, adamemic_description: e.target.value })}
            placeholder="Academic Description"
            required
          />
          <input
            type="number"
            value={record.IQ}
            onChange={(e) => setRecord({ ...record, IQ: e.target.value })}
            placeholder="IQ"
            required
          />
          <input
            type="text"
            value={record.type_school}
            onChange={(e) => setRecord({ ...record, type_school: e.target.value })}
            placeholder="Type of School"
            required
          />
          <input
            type="text"
            value={record.socio_economic_status}
            onChange={(e) => setRecord({ ...record, socio_economic_status: e.target.value })}
            placeholder="Socio-Economic Status"
            required
          />
          <input
            type="text"
            value={record.Study_Habit}
            onChange={(e) => setRecord({ ...record, Study_Habit: e.target.value })}
            placeholder="Study Habit"
            required
          />
          <input
            type="text"
            value={record.NAT_Results}
            onChange={(e) => setRecord({ ...record, NAT_Results: e.target.value })}
            placeholder="NAT Results"
            required
          />
          <div className="modal-buttons">
            <button type="button" onClick={onSave}>Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
