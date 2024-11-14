
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onSave, record, setRecord }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Record</h2>
        <form>
          <div className='divider_1'>
            <label>Respondents Name
          <input
            type="text"
            value={record.Respondents}
            onChange={(e) => setRecord({ ...record, Respondents: e.target.value })}
            placeholder="Respondents"
            required
          /></label>
           <label>Respondents Age
          <input
            type="number"
            value={record.age}
            onChange={(e) => setRecord({ ...record, age: e.target.value })}
            placeholder="Age"
            required
          /></label>
           <label>Respondents Gender
          <input
            type="text"
            value={record.sex}
            onChange={(e) => setRecord({ ...record, sex: e.target.value })}
            placeholder="Sex"
            required
          /></label>
           <label>Respondents Ethnic
          <input
            type="text"
            value={record.Ethnic}
            onChange={(e) => setRecord({ ...record, Ethnic: e.target.value })}
            placeholder="Ethnic"
            required
          /></label>
        
          <label> Respondents IQ
            <input
            type="number"
            value={record.IQ}
            onChange={(e) => setRecord({ ...record, IQ: e.target.value })}
            placeholder="IQ"
            required
          /></label>
          <label>Type of School
          <input
            type="text"
            value={record.type_school}
            onChange={(e) => setRecord({ ...record, type_school: e.target.value })}
            placeholder="Type of School"
            required
          />
          </label>
          <label>Economic Status
          <input
            type="text"
            value={record.socio_economic_status}
            onChange={(e) => setRecord({ ...record, socio_economic_status: e.target.value })}
            placeholder="Socio-Economic Status"
            required
          /></label>
          <label>Study Habit
          <input
            type="text"
            value={record.Study_Habit}
            onChange={(e) => setRecord({ ...record, Study_Habit: e.target.value })}
            placeholder="Study Habit"
            required
          /></label>
          <label>Respondents NAT Result
          <input
            type="text"
            value={record.NAT_Results}
            onChange={(e) => setRecord({ ...record, NAT_Results: e.target.value })}
            placeholder="NAT Results"
            required
          /></label>
          <label>Academic <br></br>Performance
          <input
            type="text"
            value={record.academic_perfromance}
            onChange={(e) => setRecord({ ...record, academic_perfromance: e.target.value })}
            placeholder="Academic Performance"
            required
          /></label>
             <label>Academic Description
          <textarea  className='Description'
      
            type="text"
            value={record.adamemic_description}
            onChange={(e) => setRecord({ ...record, adamemic_description: e.target.value })}
            placeholder="Academic Description"
            required
          /> </label></div>
          
        
        </form>
        <div className="modal-buttons">
            <button type="button" onClick={onSave} className='button_save'>save</button>
            <button type="button" onClick={onClose} className='button_cancel'>Cancel</button>
          </div>
      </div>
    </div>
  );
};

export default Modal;
