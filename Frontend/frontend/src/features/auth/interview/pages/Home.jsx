import React, { useState, useRef } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useinterview'
import { useNavigate } from 'react-router'

const Home = () => {

  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data.id}`)
  }

  if(loading) {
    return
  }
  

  return (
    <main className="home">
      <section className="interview-builder" aria-labelledby="page-title">
        <header className="page-heading">
          <span className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            INTERVIEW STUDIO
          </span>
          <h1 id="page-title">Get ready for your next <span>big opportunity.</span></h1>
          <p>
            Bring your role and experience together to create a focused interview report.
          </p>
        </header>

        <section className="interview-card" aria-label="Interview report details">
          <div className="card-heading">
            <div>
              <span className="step-label">01 <span>/ YOUR DETAILS</span></span>
              <h2>Build your interview profile</h2>
            </div>
            <span className="private-note">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.5 8V6a4.5 4.5 0 0 1 9 0v2M4 8h12v9H4z" />
              </svg>
              Your details stay private
            </span>
          </div>

          <div className="interview-input-group">
            <div className="field-group job-description">
              <label htmlFor="jobDescription">
                <span className="field-number">01</span>
                Job description
                <span className="optional-label">Required</span>
              </label>
              <textarea
                onChange={(e) => {setJobDescription(e.target.value)}}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the job description you're preparing for..."
              />
              <span className="field-hint">Include the responsibilities and skills listed in the role.</span>
            </div>

            <div className="right-fields">
              <div className="field-group">
                <label htmlFor="resume">
                  <span className="field-number">02</span>
                  Your resume
                  <span className="optional-label">PDF</span>
                </label>
                <div className="upload-area">
                  <input
                    className="resume-input"
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf,application/pdf"
                  />
                  <label className="upload-content" htmlFor="resume">
                    <span className="upload-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 15V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" />
                      </svg>
                    </span>
                    <span className="upload-copy">
                      <strong>Choose a file to upload</strong>
                      <span>PDF document</span>
                    </span>
                    <span className="browse-label">Browse</span>
                  </label>
                </div>
                <span className="field-hint">Add your resume to tailor the report to your experience.</span>
              </div>

              <div className="field-group self-description">
                <label htmlFor="selfDescription">
                  <span className="field-number">03</span>
                  About you
                  <span className="optional-label">Optional</span>
                </label>
                <textarea
                  onChange={(e) => {setSelfDescription(e.target.value)}}
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Share your strengths, goals, or anything else you'd like us to know..."
                />
              </div>
            </div>
          </div>

          <footer className="card-footer">
            <p><span aria-hidden="true">✦</span> The more context you share, the more personalized your report.</p>
            <button onClick={handleGenerateReport} className="button primary-button" type="button">
              Generate interview report
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h11m-4-4 4 4-4 4" />
              </svg>
            </button>
          </footer>
        </section>

        <p className="page-footnote">A little preparation can make a big difference.</p>
      </section>
    </main>
  )
}

export default Home
