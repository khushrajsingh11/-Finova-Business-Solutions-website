export const services = [
  {
    slug: 'business-formation-registration',
    query: 'business-formation-registration',
    legacySlugs: ['business-formation', 'licensing-assistance'],
    legacyQueries: ['business-formation', 'licensing-assistance'],
    name: 'Business Formation & Registration',
    mark: '01',
    tag: 'FORMATION & REGISTRATION',
    description: 'Assistance with business formation, registrations, permits, licenses, renewals, filing, and compliance support.',
    headline: 'A clearer path through business setup.',
    overview: 'Finova provides administrative assistance for entrepreneurs organizing a new business and its related registration tasks. Support can include formation paperwork coordination, EIN assistance, permits and licenses, renewals, annual report filing assistance, expediting services, and business compliance support.',
    support: [
      'LLC and corporation formation assistance',
      'Business registration and EIN assistance',
      'DBA registration',
      'Business permits and licenses',
      'License renewals',
      'Annual report filing assistance',
      'Expediting services',
      'Business compliance support',
    ],
    benefit: 'Organized administrative support for the formation and registration tasks involved in getting a business established.',
    cta: 'Discuss formation support',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
  {
    slug: 'bookkeeping-payroll',
    query: 'bookkeeping-payroll',
    legacySlugs: ['bookkeeping', 'payroll'],
    legacyQueries: ['bookkeeping', 'payroll'],
    name: 'Bookkeeping & Payroll Services',
    mark: '02',
    tag: 'BOOKKEEPING & PAYROLL',
    description: 'Bookkeeping, financial recordkeeping, payroll administration, reconciliations, invoicing, reporting, and related support.',
    headline: 'Keep financial routines in better order.',
    overview: 'Finova supports day-to-day bookkeeping and payroll administration, along with related recordkeeping and financial routines. The scope can include payables and receivables, account reconciliation, billing, reports, budgeting, cash flow management, and sales tax filing support.',
    support: [
      'Bookkeeping and financial recordkeeping',
      'Payroll processing and administration',
      'Accounts payable and receivable',
      'Bank and credit card reconciliation',
      'Invoicing and billing services',
      'Financial statements and reporting',
      'Budgeting and cash flow management',
      'Sales tax filing support',
    ],
    benefit: 'Practical assistance across bookkeeping, payroll, and related financial administration, shaped around your business needs.',
    cta: 'Enquire about bookkeeping and payroll',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
  {
    slug: 'business-administration-support',
    query: 'business-administration-support',
    legacySlugs: ['administrative-support'],
    legacyQueries: ['administrative-support'],
    name: 'Business Administration & Support',
    mark: '03',
    tag: 'BUSINESS ADMINISTRATION',
    description: 'Virtual administrative assistance for email, documents, vendors, invoices, calendars, correspondence, and daily coordination.',
    headline: 'More support for the work behind the work.',
    overview: 'Finova assists with the administrative tasks and coordination that keep everyday business activity organized. Support can be tailored to the work you need help managing, from email and document handling to vendor coordination and business correspondence.',
    support: [
      'Email management and support services',
      'Virtual administrative assistance',
      'Business document preparation',
      'Agreement negotiation support',
      'Vendor and supplier coordination',
      'Invoice and payment follow-ups',
      'Data entry and document management',
      'Appointment and calendar management',
      'Business correspondence',
      'Proposal and quotation preparation',
    ],
    benefit: 'Flexible administrative assistance for the recurring details and coordination involved in running a business.',
    cta: 'Discuss administrative support',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
  {
    slug: 'marketing-business-collaborations',
    query: 'marketing-business-collaborations',
    legacySlugs: ['marketing-coordination'],
    legacyQueries: ['marketing-coordination'],
    name: 'Marketing & Business Collaborations',
    mark: '04',
    tag: 'MARKETING & COLLABORATIONS',
    description: 'Coordination for social content, promotional scheduling, business partnerships, and local collaboration opportunities.',
    headline: 'Coordinate your marketing and collaborations.',
    overview: 'Finova helps organize marketing schedules and coordinate business collaboration activities. Support may include content calendars and promotional post scheduling, as well as communication around brand partnerships, cross-promotions, and local networking opportunities.',
    support: [
      'Social media post scheduling',
      'Content calendar management',
      'Promotional post scheduling',
      'Business partnership collaborations',
      'Brand collaboration coordination',
      'Cross-promotional partnerships',
      'Local business networking and collaboration opportunities',
    ],
    benefit: 'Coordination for marketing activity and business collaborations, with scope tailored to the work you want to organize.',
    cta: 'Discuss marketing and collaborations',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
  {
    slug: 'human-resources-employee-services',
    query: 'human-resources-employee-services',
    legacySlugs: [],
    legacyQueries: [],
    name: 'Human Resources & Employee Services',
    mark: '05',
    tag: 'HUMAN RESOURCES',
    description: 'Administrative support for employee onboarding, records, payroll and HR administration, policies, and handbook preparation.',
    headline: 'Organize employee and HR administration.',
    overview: 'Finova offers administrative support for employee documentation and HR-related processes. Assistance can include onboarding materials, record organization, policy and procedure documentation, and employee handbook preparation support.',
    support: [
      'Employee onboarding and documentation',
      'Payroll and HR administration',
      'Employee records management',
      'HR policy and procedure documentation',
      'Employee handbook preparation support',
    ],
    benefit: 'Organized administrative assistance for employee records and HR documentation, tailored to your business needs.',
    cta: 'Discuss employee services',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
  {
    slug: 'business-consulting-operational-support',
    query: 'business-consulting-operational-support',
    legacySlugs: ['operational-consulting'],
    legacyQueries: ['operational-consulting'],
    name: 'Business Consulting & Operational Support',
    mark: '06',
    tag: 'CONSULTING & OPERATIONS',
    description: 'Support with business planning, strategy, operations, budgeting, process improvement, performance tracking, and growth planning.',
    headline: 'Bring more clarity to business operations.',
    overview: 'Finova works with businesses on planning and operational support across startup, expansion, and day-to-day management needs. Depending on your priorities, this may include budgeting, process improvement, performance monitoring, vendor or contract negotiation support, and multi-location coordination.',
    support: [
      'Business planning and strategy',
      'Business operations consulting',
      'Startup and expansion support',
      'Financial planning and budgeting',
      'Cost reduction and profitability analysis',
      'Vendor and contract negotiation support',
      'Business process improvement',
      'Performance monitoring and KPI reporting',
      'Business growth strategies',
      'Multi-location business management support',
    ],
    benefit: 'Planning and operational support focused on the priorities and processes that matter to your business.',
    cta: 'Talk through your business needs',
    inquiry: { questions: [], validate: null, submissionAdapter: null },
  },
]

export const generalEnquiry = {
  query: 'general-enquiry',
  name: 'General Enquiry',
  inquiry: { questions: [], validate: null, submissionAdapter: null },
}

const legacyQueryAliases = new Map(services.flatMap((service) => (service.legacyQueries || []).map((query) => [query, service.query])))
const legacySlugAliases = new Map(services.flatMap((service) => (service.legacySlugs || []).map((slug) => [slug, service.slug])))

export function serviceBySlug(slug) {
  const canonicalSlug = legacySlugAliases.get(slug) || slug
  return services.find((service) => service.slug === canonicalSlug)
}

export function serviceByQuery(query) {
  const canonicalQuery = legacyQueryAliases.get(query) || query
  return services.find((service) => service.query === canonicalQuery)
}

export function resolveInquiryServiceQuery(search) {
  const requested = new URLSearchParams(search).get('service')
  return serviceByQuery(requested)?.query || generalEnquiry.query
}

export function inquiryPath(service) {
  return service ? `/inquiry?service=${encodeURIComponent(service.query)}` : '/inquiry'
}
