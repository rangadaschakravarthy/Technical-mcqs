/**
 * CS Fundamentals Topics Configuration
 * All 30 required topics for Accenture Prep Arena.
 */

export const CS_TOPICS = [
  {
    id: 'pseudocodes',
    name: 'Pseudocodes & Logic Tracing',
    category: 'Pseudocode & Logic',
    icon: 'Binary',
    description: 'Accenture-pattern pseudocode, Bitwise operators (^, &, |, ~, <<, >>), loops, conditional execution, recursion, and step-by-step variable evaluation.',
    questionCount: 20,
    difficultySplit: { Easy: 6, Medium: 9, Hard: 5 }
  },
  {
    id: 'ms-excel',
    name: 'MS Excel & Spreadsheets',
    category: 'Common Applications',
    icon: 'Table',
    description: 'VLOOKUP, HLOOKUP, INDEX/MATCH, SUMIF, COUNTIF, absolute vs relative referencing ($A$1), Pivot Tables, formatting, and shortcut keys.',
    questionCount: 18,
    difficultySplit: { Easy: 6, Medium: 8, Hard: 4 }
  },
  {
    id: 'ms-office',
    name: 'MS Office & Common Applications',
    category: 'Common Applications',
    icon: 'FileText',
    description: 'MS Word formatting & Mail Merge, PowerPoint slide master & animations, Outlook, office shortcuts, and application interoperability.',
    questionCount: 15,
    difficultySplit: { Easy: 6, Medium: 6, Hard: 3 }
  },
  {
    id: 'network-security',
    name: 'Network Security',
    category: 'Network Security & Cloud',
    icon: 'ShieldAlert',
    description: 'Packet filtering & stateful firewalls, IDS/IPS, TLS/SSL handshakes, VPNs, DoS/DDoS mitigation, ARP spoofing, hashing vs encryption, and MITM attacks.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing & Architecture',
    category: 'Network Security & Cloud',
    icon: 'Cloud',
    description: 'IaaS, PaaS, SaaS models, Public/Private/Hybrid clouds, AWS & Azure core services, virtualization & hypervisors, VPC, IAM, serverless, and S3 storage.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    category: 'Core Systems',
    icon: 'Network',
    description: 'OSI 7-layer model, TCP/IP, IP addressing, subnetting, switching, routing, and sockets.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    category: 'Core Systems',
    icon: 'Cpu',
    description: 'Process management, CPU scheduling, deadlocks, paging, virtual memory, and concurrency.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'dbms',
    name: 'DBMS',
    category: 'Databases',
    icon: 'Database',
    description: 'Relational model, ACID properties, ER diagrams, indexing, hashing, and concurrency control.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'sql-fundamentals',
    name: 'SQL Fundamentals',
    category: 'Databases',
    icon: 'Terminal',
    description: 'SELECT, WHERE, JOINs, GROUP BY, HAVING, Subqueries, aggregate functions, and constraints.',
    questionCount: 15,
    difficultySplit: { Easy: 6, Medium: 6, Hard: 3 }
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'Programming',
    icon: 'Boxes',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, Design Principles, and SOLID patterns.',
    questionCount: 15,
    difficultySplit: { Easy: 6, Medium: 6, Hard: 3 }
  },
  {
    id: 'programming-fundamentals',
    name: 'Programming Fundamentals',
    category: 'Programming',
    icon: 'Code',
    description: 'Variables, data types, control flow, loops, functions, scope, pointers, and memory layout.',
    questionCount: 15,
    difficultySplit: { Easy: 7, Medium: 5, Hard: 3 }
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    category: 'DSA',
    icon: 'Layers',
    description: 'Arrays, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Heaps, and Hash Tables.',
    questionCount: 15,
    difficultySplit: { Easy: 4, Medium: 8, Hard: 3 }
  },
  {
    id: 'algorithms-complexity',
    name: 'Algorithms and Complexity',
    category: 'DSA',
    icon: 'Binary',
    description: 'Asymptotic notation (Big O, Omega, Theta), Sorting, Searching, Greedy, and Dynamic Programming.',
    questionCount: 15,
    difficultySplit: { Easy: 4, Medium: 8, Hard: 3 }
  },
  {
    id: 'computer-architecture',
    name: 'Computer Architecture',
    category: 'Hardware & Systems',
    icon: 'CircuitBoard',
    description: 'Instruction sets (RISC vs CISC), Pipelining, Cache hierarchy, Memory management, and ALU.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    category: 'Software Engineering',
    icon: 'FileCode',
    description: 'Requirements engineering, modular design, coupling and cohesion, refactoring, and documentation.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'sdlc-testing',
    name: 'SDLC and Software Testing',
    category: 'Software Engineering',
    icon: 'CheckCircle2',
    description: 'Waterfall, Agile, V-Model, Unit testing, Integration testing, Black-box & White-box methods.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },

  {
    id: 'cybersecurity',
    name: 'Cybersecurity Fundamentals',
    category: 'Security',
    icon: 'ShieldCheck',
    description: 'CIA triad, symmetric/asymmetric encryption, hashing, SQL injection, XSS, and authentication.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'computer-organization',
    name: 'Computer Organization',
    category: 'Hardware & Systems',
    icon: 'Server',
    description: 'Registers, Von Neumann architecture, Bus topologies, Interrupts, and I/O interfacing.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'c-programming',
    name: 'C Programming',
    category: 'Languages',
    icon: 'FileCode2',
    description: 'Pointers, memory allocation (malloc/calloc), structs, unions, preprocessor macros, and file I/O.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'cpp-programming',
    name: 'C++ Programming',
    category: 'Languages',
    icon: 'Code2',
    description: 'STL (vectors, maps), references, copy constructors, operator overloading, templates, and RAII.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'java-programming',
    name: 'Java Programming',
    category: 'Languages',
    icon: 'Coffee',
    description: 'JVM, JDK, JRE, garbage collection, exceptions, collections framework, multithreading, and streams.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'python-programming',
    name: 'Python Programming',
    category: 'Languages',
    icon: 'TerminalSquare',
    description: 'List comprehensions, generators, decorators, lambda functions, OOP in Python, and dictionaries.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'web-technologies',
    name: 'Web Technologies',
    category: 'Web Dev',
    icon: 'Globe',
    description: 'HTTP/HTTPS, REST APIs, JSON, client-server architecture, status codes, cookies, and CORS.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'html-css',
    name: 'HTML and CSS',
    category: 'Web Dev',
    icon: 'Layout',
    description: 'Semantic tags, box model, Flexbox, CSS Grid, media queries, specificity, and CSS positioning.',
    questionCount: 12,
    difficultySplit: { Easy: 6, Medium: 5, Hard: 1 }
  },
  {
    id: 'javascript-fundamentals',
    name: 'JavaScript Fundamentals',
    category: 'Web Dev',
    icon: 'Zap',
    description: 'Event loop, closures, promises, async/await, prototypes, DOM manipulation, and ES6+ features.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'git-version-control',
    name: 'Git and Version Control',
    category: 'Tools & DevOps',
    icon: 'GitBranch',
    description: 'Commit, branch, merge, rebase, cherry-pick, remote repositories, stash, and merge conflicts.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'linux-commands',
    name: 'Linux and Operating System Commands',
    category: 'Core Systems',
    icon: 'Terminal',
    description: 'File permissions (chmod, chown), grep, find, ps, kill, piping, shell scripts, and cron jobs.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'networking-protocols',
    name: 'Networking Protocols',
    category: 'Core Systems',
    icon: 'Share2',
    description: 'TCP vs UDP, DNS, DHCP, ARP, ICMP, FTP, SMTP, TLS/SSL handshakes, and routing protocols.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'db-normalization',
    name: 'Database Normalization and Transactions',
    category: 'Databases',
    icon: 'CheckSquare',
    description: '1NF, 2NF, 3NF, BCNF, 2PL, WAL, isolation levels (Read Committed, Serializable), and deadlocks.',
    questionCount: 12,
    difficultySplit: { Easy: 4, Medium: 6, Hard: 2 }
  },
  {
    id: 'dsa-complexity',
    name: 'Data Structures and Algorithm Complexity',
    category: 'DSA',
    icon: 'Activity',
    description: 'Recurrence relations, Master Theorem, space-time trade-offs, amortized analysis, and bounds.',
    questionCount: 12,
    difficultySplit: { Easy: 3, Medium: 6, Hard: 3 }
  },
  {
    id: 'agile-scrum',
    name: 'Agile and Scrum',
    category: 'Software Engineering',
    icon: 'Users',
    description: 'Sprints, standups, product backlogs, user stories, retrospectives, velocity, and burn-down charts.',
    questionCount: 12,
    difficultySplit: { Easy: 6, Medium: 5, Hard: 1 }
  },
  {
    id: 'software-debugging',
    name: 'Software Development and Debugging',
    category: 'Software Engineering',
    icon: 'Bug',
    description: 'Stack traces, breakpoints, profiling, memory leaks, defensive programming, and logging levels.',
    questionCount: 12,
    difficultySplit: { Easy: 5, Medium: 5, Hard: 2 }
  },
  {
    id: 'technical-aptitude',
    name: 'General Technical Aptitude',
    category: 'Aptitude',
    icon: 'Compass',
    description: 'Pseudocode execution, logic analysis, flowcharts, bit manipulation, and problem-solving puzzles.',
    questionCount: 15,
    difficultySplit: { Easy: 5, Medium: 7, Hard: 3 }
  },
  {
    id: 'mixed-cs',
    name: 'Mixed CS Fundamentals',
    category: 'Full Spectrum',
    icon: 'Sparkles',
    description: 'Comprehensive cross-domain questions spanning OS, Networks, DBMS, DSA, and Software Engineering.',
    questionCount: 40,
    difficultySplit: { Easy: 12, Medium: 20, Hard: 8 }
  }
];
