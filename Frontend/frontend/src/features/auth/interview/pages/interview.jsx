import React, { useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useinterview.js'
import { useNavigate, useParams } from 'react-router'

const defaultReport = {
    technicalQuestions: [],
    behavioralQuestions: [],
    skillGaps: [],
    preparationPlan: []
}

const getItemText = (item) => {
    if (typeof item === 'string') return item
    return item?.question || item?.title || item?.skill || item?.name || ''
}

const Interview = ({ report = defaultReport }) => {
    const [activeSection, setActiveSection] = useState('technicalQuestions')
    const sections = [
        { key: 'technicalQuestions', label: 'Technical questions', number: '01' },
        { key: 'behavioralQuestions', label: 'Behavioral questions', number: '02' },
        { key: 'preparationPlan', label: 'Road map', number: '03' }
    ]
    const activeItems = report[activeSection] || []
    const skillGaps = report.skillGaps || []

    return (
        <main className="interview-page">
            <div className="interview-shell">
                <header className="interview-header">
                    <div>
                        <span className="interview-eyebrow"><span aria-hidden="true" /> INTERVIEW REPORT</span>
                        <h1>Your preparation, <span>in focus.</span></h1>
                    </div>
                    <span className="report-status"><span aria-hidden="true" /> Report ready</span>
                </header>

                <section className="report-layout" aria-label="Interview report">
                    <nav className="report-nav" aria-label="Report sections">
                        <p className="nav-label">YOUR REPORT</p>
                        {sections.map((section) => (
                            <button
                                className={activeSection === section.key ? 'nav-item active' : 'nav-item'}
                                key={section.key}
                                type="button"
                                onClick={() => setActiveSection(section.key)}
                            >
                                <span className="nav-number">{section.number}</span>
                                {section.label}
                                <span className="nav-arrow" aria-hidden="true">→</span>
                            </button>
                        ))}
                    </nav>

                    <article className="report-content">
                        <div className="content-heading">
                            <span className="section-kicker">{sections.find((section) => section.key === activeSection)?.number} / REPORT SECTION</span>
                            <h2>{sections.find((section) => section.key === activeSection)?.label}</h2>
                            <p>{activeItems.length ? 'A focused set of prompts to help you prepare with intention.' : 'Your personalized recommendations will appear here once your report has been generated.'}</p>
                        </div>

                        {activeItems.length ? (
                            <ol className="question-list">
                                {activeItems.map((item, index) => (
                                    <li key={`${activeSection}-${index}`}>
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        <strong>{getItemText(item)}</strong>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <div className="empty-state">
                                <span className="empty-mark" aria-hidden="true">✦</span>
                                <strong>Your report is taking shape</strong>
                                <p>There are no items in this section yet.</p>
                            </div>
                        )}
                    </article>

                    <aside className="skills-panel">
                        <div className="skills-heading">
                            <span className="section-kicker">04 / DEVELOPMENT</span>
                            <h2>Skill gaps</h2>
                            <p>Topics worth revisiting before your interview.</p>
                        </div>
                        <div className="skill-list">
                            {skillGaps.length ? skillGaps.map((gap, index) => (
                                <span className="skill-chip" key={`${getItemText(gap)}-${index}`}>{getItemText(gap)}</span>
                            )) : <span className="skills-empty">No skill gaps identified yet.</span>}
                        </div>
                        <div className="skills-footer"><span aria-hidden="true">✦</span> Keep learning at your own pace.</div>
                    </aside>
                </section>
            </div>
        </main>
    )
}

export default Interview