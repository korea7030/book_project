import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { reset, Field, reduxForm } from 'redux-form';
import { addNote } from '../../actions/book';

class BookAddNote extends Component {
    constructor(props) {
        super(props);
    }

    closeNoteModal = () => {
        this.props.onRequestClose();
    }

    renderField = ({input, placeholder, type, label, writeOnce, meta: { touched, error }}) => {
        
        return (
            <div className="w-full px-3 ml-6 mr-6 mt-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <textarea {...input} 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                placeholder={placeholder} rows="10" cols="40"/>
                {touched && error && <span className="block sm:inline">{error}</span>}
            </div>
        )
    }

    handleSubmit = (values) => {
        let book_id = this.props.book_id;
        values.book = book_id
        this.props.addNote(book_id, values);
        this.closeNoteModal();
    }

    render() {
        return (
            this.props.isOpen? (
                <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Note
                  </h3>
                  <button
                    type="button" className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={this.closeNoteModal}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex mb-4">
                <div className="w-full">
                    <form className="w-full max-w-lg" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <Field
                                name="note"
                                label="Note"
                                component={this.renderField}
                                placeholder="Note Content"
                                validate={[noteRequiredCheck]}
                            >
                            </Field>
                        </div>

                        <div className="flex flex-wrap items-center py-2 mx-6 mt-3">
                            <button className="flex flex-wrap bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            AddNote
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
              </div>
            </div>
          </div>
            ): (<div></div>)
        );
    }
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('BookAddNote'));

BookAddNote = reduxForm({
    form: 'BookAddNote',
    onSubmitSuccess: afterSubmit // afterSubmit 호출하여 form값들 reset
})(BookAddNote);

const noteRequiredCheck = (value) => value === undefined ? <span className='block sm:inline text-red-700'>this field required </span>: undefined;

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,  
});

BookAddNote = connect(mapStateToProps, {addNote})(BookAddNote);

export default BookAddNote;
