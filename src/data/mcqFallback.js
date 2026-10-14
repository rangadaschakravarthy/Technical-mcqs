/**
 * Local MCQ Question Bank
 * Provides a comprehensive, resilient fallback pool across CS Fundamentals topics.
 * Each question has 4 options, 0-based correctAnswer index, and detailed concept breakdown.
 */

export const MCQ_FALLBACK_BANK = [
  // --- Operating Systems ---
  {
    id: 'os-001',
    topic: 'Operating Systems',
    difficulty: 'Medium',
    question: 'Which CPU scheduling algorithm can cause starvation (indefinite postponement)?',
    options: [
      'Round Robin',
      'First Come First Served (FCFS)',
      'Priority Scheduling without Aging',
      'Shortest Remaining Time First with Aging'
    ],
    correctAnswer: 2,
    explanation: 'Priority Scheduling without an aging mechanism can cause starvation if high-priority processes continually enter the ready queue.',
    optionExplanations: [
      'Round Robin guarantees each ready process a regular time slice, preventing starvation.',
      'FCFS processes jobs in arrival order; all arrivees eventually get serviced unless a process loops infinitely.',
      'Low-priority processes may wait indefinitely if higher-priority processes keep arriving.',
      'Aging gradually raises the priority of waiting processes, preventing starvation.'
    ],
    concept: 'CPU Scheduling & Starvation',
    source: 'Local practice bank'
  },
  {
    id: 'os-002',
    topic: 'Operating Systems',
    difficulty: 'Easy',
    question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for deadlock?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemption Allowed',
      'Circular Wait'
    ],
    correctAnswer: 2,
    explanation: 'The four necessary conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks can be broken.',
    optionExplanations: [
      'Mutual Exclusion is a required condition (at least one resource must be non-shareable).',
      'Hold and Wait is a required condition (process holds resources while waiting for more).',
      'No Preemption is the actual condition; allowing preemption prevents deadlocks.',
      'Circular Wait is the fourth required condition for a deadlock to exist.'
    ],
    concept: 'Deadlock Conditions',
    source: 'Local practice bank'
  },
  {
    id: 'os-003',
    topic: 'Operating Systems',
    difficulty: 'Hard',
    question: 'In virtual memory systems, what is Belady\'s Anomaly?',
    options: [
      'Increasing page size increases the page fault rate',
      'Increasing the number of page frames results in an increase in page faults',
      'LRU page replacement causes more faults than FIFO',
      'Thrashing occurs when the working set is smaller than physical RAM'
    ],
    correctAnswer: 1,
    explanation: 'Belady\'s Anomaly is the phenomenon where allocating more page frames to a process can counterintuitively cause more page faults, primarily observed in FIFO page replacement.',
    optionExplanations: [
      'Page size adjustments affect internal fragmentation, not Belady\'s Anomaly.',
      'Allocating more physical frames increases the fault count for certain access strings under FIFO.',
      'Stack algorithms like LRU are mathematically immune to Belady\'s Anomaly.',
      'Thrashing occurs when the sum of working sets exceeds total physical memory.'
    ],
    concept: 'Virtual Memory & Page Replacement',
    source: 'Local practice bank'
  },
  {
    id: 'os-004',
    topic: 'Operating Systems',
    difficulty: 'Easy',
    question: 'What is the primary role of the Translation Lookaside Buffer (TLB)?',
    options: [
      'Store disk blocks for faster I/O',
      'Cache virtual-to-physical address translations',
      'Schedule threads across multiple CPU cores',
      'Buffer network packets before interrupt handling'
    ],
    correctAnswer: 1,
    explanation: 'The TLB is a high-speed associative hardware cache inside the MMU that stores recent virtual-to-physical page table translations to speed up memory access.',
    optionExplanations: [
      'Disk caching is handled by the OS buffer cache in RAM.',
      'The TLB caches recent virtual-to-physical address translations to avoid multiple RAM lookups.',
      'Thread scheduling is done in software by the OS kernel scheduler.',
      'Network packet buffering is handled by NIC ring buffers and OS network stack.'
    ],
    concept: 'Memory Management & Paging',
    source: 'Local practice bank'
  },

  // --- Computer Networks ---
  {
    id: 'net-001',
    topic: 'Computer Networks',
    difficulty: 'Easy',
    question: 'Which layer of the OSI model is responsible for end-to-end reliable data delivery and flow control?',
    options: [
      'Data Link Layer',
      'Network Layer',
      'Transport Layer',
      'Session Layer'
    ],
    correctAnswer: 2,
    explanation: 'The Transport Layer (Layer 4), represented by protocols like TCP, provides end-to-end communication, segmentation, flow control, and reliability.',
    optionExplanations: [
      'Data Link handles node-to-node (hop-by-hop) framing and MAC addressing.',
      'Network Layer handles logical host-to-host routing and IP addressing.',
      'Transport Layer handles process-to-process, end-to-end communication and error recovery.',
      'Session Layer manages dialogues and sessions between applications.'
    ],
    concept: 'OSI 7-Layer Architecture',
    source: 'Local practice bank'
  },
  {
    id: 'net-002',
    topic: 'Computer Networks',
    difficulty: 'Medium',
    question: 'What is the standard size of an IPv6 address in bits?',
    options: [
      '32 bits',
      '64 bits',
      '128 bits',
      '256 bits'
    ],
    correctAnswer: 2,
    explanation: 'IPv6 addresses are 128 bits (16 bytes) in length, typically written as eight groups of four hexadecimal digits separated by colons.',
    optionExplanations: [
      '32 bits is the length of an IPv4 address.',
      '64 bits is the size of an EUI-64 interface identifier.',
      '128 bits allows 2^128 unique addresses, resolving IPv4 address exhaustion.',
      '256 bits is commonly used for cryptographic keys like SHA-256, not IPv6.'
    ],
    concept: 'IP Addressing',
    source: 'Local practice bank'
  },
  {
    id: 'net-003',
    topic: 'Computer Networks',
    difficulty: 'Hard',
    question: 'During a TCP 3-way handshake, what flags are set in the second packet sent from the server to the client?',
    options: [
      'SYN only',
      'ACK only',
      'SYN and ACK',
      'FIN and ACK'
    ],
    correctAnswer: 2,
    explanation: 'In the TCP 3-way handshake: Client sends SYN -> Server responds with SYN-ACK -> Client concludes with ACK.',
    optionExplanations: [
      'The initial packet from client contains SYN only.',
      'The third packet from client contains ACK only.',
      'The server acknowledges the client ISN (ACK) and synchronizes its own ISN (SYN).',
      'FIN-ACK is used during connection termination, not connection establishment.'
    ],
    concept: 'TCP Handshake & Connection Management',
    source: 'Local practice bank'
  },

  // --- DBMS & SQL ---
  {
    id: 'dbms-001',
    topic: 'DBMS',
    difficulty: 'Easy',
    question: 'Which Normal Form eliminates partial functional dependencies on candidate keys?',
    options: [
      'First Normal Form (1NF)',
      'Second Normal Form (2NF)',
      'Third Normal Form (3NF)',
      'Boyce-Codd Normal Form (BCNF)'
    ],
    correctAnswer: 1,
    explanation: 'Second Normal Form (2NF) requires 1NF and ensures that every non-prime attribute is fully functionally dependent on the entire primary key, eliminating partial dependencies.',
    optionExplanations: [
      '1NF eliminates repeating groups and enforces atomic column values.',
      '2NF removes partial dependencies on composite candidate keys.',
      '3NF eliminates transitive dependencies (non-prime determining non-prime).',
      'BCNF requires that every determinant must be a candidate key.'
    ],
    concept: 'Database Normalization',
    source: 'Local practice bank'
  },
  {
    id: 'dbms-002',
    topic: 'DBMS',
    difficulty: 'Medium',
    question: 'In the ACID properties of database transactions, what does "Isolation" ensure?',
    options: [
      'Data changes persist even after a system crash',
      'Transactions either complete fully or have no effect at all',
      'Concurrent execution of transactions results in a state equivalent to serial execution',
      'The database remains in a valid state satisfying all integrity constraints'
    ],
    correctAnswer: 2,
    explanation: 'Isolation ensures that intermediate transaction states are invisible to other concurrently running transactions, preventing dirty reads and conflicting writes.',
    optionExplanations: [
      'Persistence after a crash is Durability.',
      'All-or-nothing execution is Atomicity.',
      'Invisible intermediate states and serializability describe Isolation.',
      'Preserving integrity constraints is Consistency.'
    ],
    concept: 'ACID Properties',
    source: 'Local practice bank'
  },
  {
    id: 'sql-001',
    topic: 'SQL Fundamentals',
    difficulty: 'Medium',
    question: 'What is the key difference between the WHERE and HAVING clauses in SQL?',
    options: [
      'WHERE can use aggregate functions; HAVING cannot',
      'HAVING filters rows before grouping; WHERE filters groups after grouping',
      'WHERE filters individual rows before aggregation; HAVING filters grouped rows after aggregation',
      'There is no functional difference; they are aliases for each other'
    ],
    correctAnswer: 2,
    explanation: 'WHERE evaluates individual table rows before any GROUP BY aggregation occurs. HAVING filters aggregate summary records after groups have been computed.',
    optionExplanations: [
      'WHERE cannot use aggregate functions directly (e.g. WHERE COUNT(*) > 5 is invalid).',
      'This reverses their actual order of execution in the SQL pipeline.',
      'WHERE filters individual rows prior to GROUP BY; HAVING filters post-aggregation groups.',
      'They operate at fundamentally different phases of SQL query execution.'
    ],
    concept: 'SQL Clauses & Filtering',
    source: 'Local practice bank'
  },
  {
    id: 'sql-002',
    topic: 'SQL Fundamentals',
    difficulty: 'Hard',
    question: 'Which SQL statement retrieves all departments even if they currently have no assigned employees?',
    options: [
      'SELECT * FROM employees INNER JOIN departments ON employees.dept_id = departments.id',
      'SELECT * FROM departments LEFT JOIN employees ON departments.id = employees.dept_id',
      'SELECT * FROM departments CROSS JOIN employees',
      'SELECT * FROM employees RIGHT JOIN departments ON employees.dept_id = departments.id WHERE employees.id IS NOT NULL'
    ],
    correctAnswer: 1,
    explanation: 'A LEFT JOIN with `departments` on the left preserves every row from `departments`, filling missing `employees` columns with NULLs when no match exists.',
    optionExplanations: [
      'INNER JOIN drops departments with zero employees.',
      'LEFT JOIN preserves all rows from the left table (departments).',
      'CROSS JOIN produces a Cartesian product, pairing every employee with every department.',
      'The WHERE clause excludes NULLs, defeating the purpose of the outer join.'
    ],
    concept: 'SQL Joins',
    source: 'Local practice bank'
  },

  // --- Object-Oriented Programming ---
  {
    id: 'oop-001',
    topic: 'Object-Oriented Programming',
    difficulty: 'Easy',
    question: 'Which OOP principle binds data and the methods that operate on that data into a single cohesive unit while restricting direct external access?',
    options: [
      'Polymorphism',
      'Inheritance',
      'Encapsulation',
      'Abstraction'
    ],
    correctAnswer: 2,
    explanation: 'Encapsulation is the bundling of data and methods inside a class, coupled with data hiding via access modifiers (private, protected).',
    optionExplanations: [
      'Polymorphism allows objects of different types to respond to the same interface.',
      'Inheritance allows a class to derive behavior and fields from a base class.',
      'Encapsulation bundles data and methods while restricting direct access via private fields.',
      'Abstraction hides internal complexity and exposes only essential interfaces.'
    ],
    concept: 'OOP Core Pillars',
    source: 'Local practice bank'
  },
  {
    id: 'oop-002',
    topic: 'Object-Oriented Programming',
    difficulty: 'Medium',
    question: 'In the SOLID design principles, what does the "Liskov Substitution Principle (LSP)" state?',
    options: [
      'A class should have only one reason to change',
      'Software entities should be open for extension, but closed for modification',
      'Subtypes must be substitutable for their base types without altering program correctness',
      'Depend upon abstractions rather than concrete implementations'
    ],
    correctAnswer: 2,
    explanation: 'LSP requires that objects of a superclass should be replaceable with objects of its subclasses without breaking application logic or violating invariants.',
    optionExplanations: [
      'Single reason to change is the Single Responsibility Principle (SRP).',
      'Open for extension, closed for modification is the Open/Closed Principle (OCP).',
      'LSP mandates that derived classes honor all contracts of their parent classes.',
      'Depend upon abstractions is the Dependency Inversion Principle (DIP).'
    ],
    concept: 'SOLID Principles',
    source: 'Local practice bank'
  },

  // --- Data Structures & Algorithms ---
  {
    id: 'dsa-001',
    topic: 'Data Structures',
    difficulty: 'Medium',
    question: 'What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST) of N elements?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 2,
    explanation: 'In the worst case (e.g. elements inserted in sorted order), an unbalanced BST degenerates into a linear linked list with height N, leading to O(N) search time.',
    optionExplanations: [
      'O(1) is typical for hash table lookups, not BSTs.',
      'O(log N) is the average or balanced tree search complexity (e.g., AVL or Red-Black).',
      'A skewed BST has a depth of N, requiring up to N comparisons.',
      'O(N log N) is common for sorting algorithms, not BST lookups.'
    ],
    concept: 'Trees & Search Complexity',
    source: 'Local practice bank'
  },
  {
    id: 'dsa-002',
    topic: 'Algorithms and Complexity',
    difficulty: 'Easy',
    question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(N log N)?',
    options: [
      'Quick Sort',
      'Merge Sort',
      'Bubble Sort',
      'Insertion Sort'
    ],
    correctAnswer: 1,
    explanation: 'Merge Sort divides the array in half recursively (log N levels) and merges in linear time (N), guaranteeing O(N log N) in all cases (best, average, and worst).',
    optionExplanations: [
      'Quick Sort has an O(N^2) worst-case when poor pivots are chosen.',
      'Merge Sort consistently executes in O(N log N) time regardless of input order.',
      'Bubble Sort worst-case is O(N^2).',
      'Insertion Sort worst-case is O(N^2) for reverse-sorted data.'
    ],
    concept: 'Sorting Algorithms',
    source: 'Local practice bank'
  },
  {
    id: 'dsa-003',
    topic: 'Data Structures',
    difficulty: 'Easy',
    question: 'Which data structure follows the LIFO (Last-In, First-Out) principle?',
    options: [
      'Queue',
      'Stack',
      'Priority Queue',
      'Deque'
    ],
    correctAnswer: 1,
    explanation: 'A Stack operates strictly on LIFO order, where elements are inserted and removed from the same end (the top).',
    optionExplanations: [
      'Queues operate on FIFO (First-In, First-Out).',
      'Stacks push and pop from the top according to LIFO.',
      'Priority Queues pop based on key priority rather than arrival order.',
      'Deques allow insertion and deletion at both ends.'
    ],
    concept: 'Stacks and Queues',
    source: 'Local practice bank'
  },

  // --- Software Engineering & Testing ---
  {
    id: 'se-001',
    topic: 'Software Engineering',
    difficulty: 'Medium',
    question: 'In software architecture, what does high cohesion and low coupling signify?',
    options: [
      'Modules depend heavily on each other and perform unrelated duties',
      'Modules have focused, single-purpose responsibilities and minimal interdependencies',
      'Code is compiled into a single monolithic binary without interfaces',
      'Data structures are exposed globally to eliminate function parameters'
    ],
    correctAnswer: 1,
    explanation: 'High cohesion means code within a module closely relates to a single purpose. Low coupling means modules interact through minimal, well-defined interfaces.',
    optionExplanations: [
      'Heavy interdependence is high coupling; unrelated duties is low cohesion (an anti-pattern).',
      'High cohesion + low coupling promotes modularity, testability, and maintainability.',
      'Monolithic binary packaging is unrelated to architectural coupling.',
      'Global variables create tight, fragile coupling.'
    ],
    concept: 'Coupling and Cohesion',
    source: 'Local practice bank'
  },
  {
    id: 'se-002',
    topic: 'SDLC and Software Testing',
    difficulty: 'Easy',
    question: 'What is Black-Box testing?',
    options: [
      'Testing internal code structures, branch paths, and implementation logic',
      'Testing software functionality based on specifications without knowledge of internal code',
      'Testing the physical hardware chips of a server rack',
      'Reviewing source code line-by-line during a pull request review'
    ],
    correctAnswer: 1,
    explanation: 'Black-box testing treats the system as an opaque box, testing input/output behavior against functional requirements without examining internal source code.',
    optionExplanations: [
      'Examining internal paths and branches is White-Box (structural) testing.',
      'Black-box testing focuses purely on inputs, outputs, and system specifications.',
      'Hardware diagnostics are not software black-box testing.',
      'Peer code reviews are static code analysis, not dynamic black-box testing.'
    ],
    concept: 'Testing Methodologies',
    source: 'Local practice bank'
  },

  // --- Web Technologies & JavaScript ---
  {
    id: 'web-001',
    topic: 'Web Technologies',
    difficulty: 'Easy',
    question: 'Which HTTP status code signifies that a requested resource was not found on the server?',
    options: [
      '200 OK',
      '401 Unauthorized',
      '404 Not Found',
      '500 Internal Server Error'
    ],
    correctAnswer: 2,
    explanation: 'HTTP 404 indicates that the origin server did not find a current representation for the target resource.',
    optionExplanations: [
      '200 OK signifies a successful HTTP request.',
      '401 indicates authentication credentials are required or failed.',
      '404 Not Found indicates the resource does not exist.',
      '500 indicates an unexpected error occurred on the server.'
    ],
    concept: 'HTTP Status Codes',
    source: 'Local practice bank'
  },
  {
    id: 'js-001',
    topic: 'JavaScript Fundamentals',
    difficulty: 'Medium',
    question: 'In JavaScript, what will the expression `typeof NaN` evaluate to?',
    options: [
      '"undefined"',
      '"nan"',
      '"number"',
      '"object"'
    ],
    correctAnswer: 2,
    explanation: 'In JavaScript, `NaN` (Not-a-Number) is a special numeric value defined by IEEE 754, so `typeof NaN` returns "number".',
    optionExplanations: [
      'undefined is returned for declared unassigned variables.',
      '"nan" is not a valid primitive type string in JS.',
      'According to ECMAScript specification, NaN belongs to the Number data type.',
      '"object" is returned for arrays, objects, and null.'
    ],
    concept: 'JavaScript Types & Coercion',
    source: 'Local practice bank'
  },
  {
    id: 'js-002',
    topic: 'JavaScript Fundamentals',
    difficulty: 'Hard',
    question: 'What is a JavaScript Closure?',
    options: [
      'A method used to close browser tabs and window instances',
      'A function bundled together with references to its lexical environment',
      'A syntax error that occurs when curly brackets are unclosed',
      'A built-in garbage collection cycle in the V8 engine'
    ],
    correctAnswer: 1,
    explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment), allowing access to outer scope variables even after the outer function has returned.',
    optionExplanations: [
      'Closing tabs is window.close(), unrelated to lexical scope.',
      'Closures give inner functions access to an outer function\'s scope chain.',
      'Unclosed braces cause a SyntaxError, not a closure.',
      'Garbage collection cleans unreferenced objects, whereas closures retain variables in memory.'
    ],
    concept: 'Closures and Lexical Scope',
    source: 'Local practice bank'
  },

  // --- Python Programming ---
  {
    id: 'py-001',
    topic: 'Python Programming',
    difficulty: 'Easy',
    question: 'Which of the following Python data structures is mutable?',
    options: [
      'tuple',
      'str',
      'list',
      'frozenset'
    ],
    correctAnswer: 2,
    explanation: 'In Python, lists are mutable, meaning their elements can be added, removed, or modified in place without creating a new object.',
    optionExplanations: [
      'Tuples are immutable sequences.',
      'Strings (str) in Python cannot be mutated in place.',
      'Lists support in-place item assignment, append, pop, and sort.',
      'frozensets are immutable sets.'
    ],
    concept: 'Python Mutability & Data Structures',
    source: 'Local practice bank'
  },

  // --- Cybersecurity Fundamentals ---
  {
    id: 'sec-001',
    topic: 'Cybersecurity Fundamentals',
    difficulty: 'Medium',
    question: 'Which technique is the most effective primary defense against SQL Injection vulnerabilities?',
    options: [
      'Client-side form input validation',
      'Parameterized queries (prepared statements)',
      'Escaping single quote characters manually with string replacement',
      'Hiding the database error messages in production'
    ],
    correctAnswer: 1,
    explanation: 'Parameterized queries (prepared statements) ensure the database engine treats user input strictly as data parameters rather than executable SQL command fragments.',
    optionExplanations: [
      'Client-side validation can be bypassed easily with tools like cURL or Postman.',
      'Prepared statements guarantee proper parameter binding at the protocol level.',
      'Manual regex escaping is error-prone and frequently bypassed by edge cases.',
      'Hiding errors obscures attack outcomes but does not fix the underlying vulnerability.'
    ],
    concept: 'SQL Injection Prevention',
    source: 'Local practice bank'
  },

  // --- Cloud Computing ---
  {
    id: 'cloud-001',
    topic: 'Cloud Computing Fundamentals',
    difficulty: 'Easy',
    question: 'Which cloud service model provides virtualized hardware (VMs, storage, and networking) where the customer manages the OS, runtime, and applications?',
    options: [
      'SaaS (Software as a Service)',
      'PaaS (Platform as a Service)',
      'IaaS (Infrastructure as a Service)',
      'FaaS (Function as a Service)'
    ],
    correctAnswer: 2,
    explanation: 'IaaS (such as AWS EC2 or Azure VMs) provides raw compute infrastructure, leaving OS patching, middleware, and application deployment to the consumer.',
    optionExplanations: [
      'SaaS delivers complete end-user software (e.g. Gmail, Salesforce).',
      'PaaS manages the OS and runtime, letting developers deploy code directly (e.g. Heroku).',
      'IaaS gives full control over the OS, networking, and virtual storage.',
      'FaaS executes event-driven code snippets without server management (e.g. AWS Lambda).'
    ],
    concept: 'Cloud Service Models',
    source: 'Local practice bank'
  },

  // --- Git & Version Control ---
  {
    id: 'git-001',
    topic: 'Git and Version Control',
    difficulty: 'Medium',
    question: 'What is the effect of running `git reset --soft HEAD~1`?',
    options: [
      'Permanently deletes the last commit and all changed working files',
      'Undoes the last commit but keeps all changes staged in the index',
      'Undoes the last commit and leaves changes unstaged in the working directory',
      'Creates a new reverse commit that negates previous code'
    ],
    correctAnswer: 1,
    explanation: '`git reset --soft HEAD~1` moves the HEAD pointer back by one commit while leaving your modified files intact and staged in the index ready to re-commit.',
    optionExplanations: [
      'Discarding files and commit requires `--hard`.',
      '`--soft` keeps the changes staged in the index.',
      '`--mixed` (the default) leaves changes unstaged in the working tree.',
      'Creating a reverse commit is done using `git revert`.'
    ],
    concept: 'Git Reset Modes',
    source: 'Local practice bank'
  },

  // --- Computer Architecture & Organization ---
  {
    id: 'arch-001',
    topic: 'Computer Architecture',
    difficulty: 'Medium',
    question: 'What is a "Pipeline Hazard" caused by an instruction depending on the result of a previous instruction that has not yet completed?',
    options: [
      'Structural Hazard',
      'Data Hazard',
      'Control Hazard',
      'Branch Hazard'
    ],
    correctAnswer: 1,
    explanation: 'A Data Hazard occurs when instructions that exhibit data dependencies overlap in different pipeline stages (e.g., Read-After-Write hazards).',
    optionExplanations: [
      'Structural hazards occur when hardware resources are insufficient for concurrent stages.',
      'Data hazards arise from data dependencies between instructions.',
      'Control hazards arise from branch instructions altering program counter flow.',
      'Branch hazard is another name for control hazard.'
    ],
    concept: 'Instruction Pipelining & Hazards',
    source: 'Local practice bank'
  },

  // --- General Technical Aptitude ---
  {
    id: 'apt-001',
    topic: 'General Technical Aptitude',
    difficulty: 'Easy',
    question: 'What will be the output of evaluating the bitwise XOR operation: `12 ^ 10`?',
    options: [
      '2',
      '6',
      '14',
      '22'
    ],
    correctAnswer: 1,
    explanation: '12 in binary is 1100. 10 in binary is 1010. Performing bitwise XOR (different bits yield 1, identical bits yield 0): 1100 ^ 1010 = 0110, which equals 6 in decimal.',
    optionExplanations: [
      '2 is 12 - 10.',
      '1100 XOR 1010 = 0110 (binary) = 6 (decimal).',
      '14 is 12 | 10 (bitwise OR).',
      '22 is 12 + 10.'
    ],
    concept: 'Bitwise Operators',
    source: 'Local practice bank'
  },

  // --- Pseudocodes & Logic Tracing ---
  {
    id: 'pseudo-001',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 5, b = 3\nc = (a ^ b) + (a << 1)\nPrint c`,
    options: [
      '12',
      '16',
      '14',
      '18'
    ],
    correctAnswer: 1,
    explanation: 'a = 5 (0101 in binary), b = 3 (0011 in binary). a ^ b (XOR) gives 0110 in binary = 6. a << 1 shifts 5 left by 1 bit, giving 10. Thus, c = 6 + 10 = 16.',
    optionExplanations: [
      '12 occurs if shift calculation is neglected.',
      '16 is the exact result: (5 ^ 3) = 6, (5 << 1) = 10, 6 + 10 = 16.',
      '14 is an arithmetic error.',
      '18 assumes 5 ^ 3 = 8.'
    ],
    concept: 'Bitwise XOR & Shift Operators',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-002',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Hard',
    question: `What is the output of the following pseudocode?\n\nInteger p, q, r\nSet p = 8, q = 6, r = 2\nIf ((p & q) > (p ^ r))\n  r = p + q\nElse\n  r = (q | r) + p\nEnd If\nPrint r`,
    options: [
      '14',
      '16',
      '10',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'p = 8 (1000 in binary), q = 6 (0110 in binary), r = 2 (0010 in binary). p & q = 0. p ^ r = 1000 ^ 0010 = 1010 (10 in decimal). Since (0 > 10) is False, the Else branch executes: (q | r) = (0110 | 0010) = 0110 (6 in decimal). r = 6 + p = 6 + 8 = 14.',
    optionExplanations: [
      '14 is correct: (8 & 6) = 0, (8 ^ 2) = 10; 0 > 10 is false; (6 | 2) = 6; 6 + 8 = 14.',
      '16 is the value of the If branch (p + q = 8 + 6 = 14, wait, 16 is incorrect).',
      '10 is (p ^ r).',
      '8 is p alone.'
    ],
    concept: 'Bitwise Logic & Conditional Execution',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-003',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Easy',
    question: `What will be the output of the following pseudocode?\n\nInteger a, b\nSet a = 12, b = 7\na = a ^ b\nb = a ^ b\na = a ^ b\nPrint a, b`,
    options: [
      '12, 7',
      '7, 12',
      '19, 12',
      '0, 0'
    ],
    correctAnswer: 1,
    explanation: 'This sequence is the standard three-step XOR swap algorithm. It swaps the values of variables a and b in place without needing a temporary variable. Hence a becomes 7 and b becomes 12.',
    optionExplanations: [
      '12, 7 represents the original unswapped values.',
      '7, 12 is correct: XOR swap algorithm exchanges variable values.',
      '19 is an arithmetic sum not produced by bitwise XOR.',
      '0, 0 would only occur if a and b pointed to the exact same memory location.'
    ],
    concept: 'In-Place XOR Swap',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-004',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will the following pseudocode print?\n\nInteger count, i, j\nSet count = 0\nFor i = 1 to 4\n  For j = 1 to 3\n    If (i MOD 2 == 0 AND j MOD 2 != 0)\n      count = count + (i * j)\n    End If\n  End For\nEnd For\nPrint count`,
    options: [
      '18',
      '24',
      '12',
      '30'
    ],
    correctAnswer: 1,
    explanation: 'i MOD 2 == 0 selects even i: i=2 and i=4. j MOD 2 != 0 selects odd j: j=1 and j=3. For i=2: (2*1) + (2*3) = 2 + 6 = 8. For i=4: (4*1) + (4*3) = 4 + 12 = 16. Total count = 8 + 16 = 24.',
    optionExplanations: [
      '18 misses the term for i=4, j=3.',
      '24 is correct: for i=2: 2 + 6 = 8; for i=4: 4 + 12 = 16; total = 24.',
      '12 only computes the products with j=3.',
      '30 sums products for all iterations without filtering.'
    ],
    concept: 'Nested Loops & Modular Arithmetic',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-005',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Easy',
    question: `What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 24, b = 2\nSet c = (a >> b) & 3\nPrint c`,
    options: ['2', '0', '3', '6'],
    correctAnswer: 0,
    explanation: 'a >> b is 24 >> 2 = 6 (binary 0110). 6 & 3 is 0110 & 0011 = 0010, which equals 2.',
    optionExplanations: ['2 is correct: 24 >> 2 = 6; 6 & 3 = 2.', '0 occurs if AND operand matches no bits.', '3 is the mask value.', '6 is only the shift result without the AND operation.'],
    concept: 'Bitwise Right Shift & Bitwise AND',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-006',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will be the output of the following pseudocode in standard two's complement integer arithmetic?\n\nInteger a, b\nSet a = 7\nSet b = ~a\nPrint b`,
    options: ['-8', '-7', '8', '0'],
    correctAnswer: 0,
    explanation: 'Bitwise NOT (~) flips all bits. In two\'s complement representation, ~x equals -(x + 1). Therefore, ~7 = -(7 + 1) = -8.',
    optionExplanations: ['-8 is correct: bitwise NOT evaluates to -(x + 1).', '-7 assumes negation without the plus 1 offset.', '8 assumes positive sign flip.', '0 is incorrect.'],
    concept: 'Bitwise NOT & Two\'s Complement',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-007',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will the following pseudocode print?\n\nInteger a, b\nSet a = 1, b = 0\nWhile (a <= 4)\n  b = b ^ a\n  a = a + 1\nEnd While\nPrint b`,
    options: ['4', '0', '10', '7'],
    correctAnswer: 0,
    explanation: 'Iteration 1: b = 0 ^ 1 = 1. Iteration 2: b = 1 ^ 2 = 3. Iteration 3: b = 3 ^ 3 = 0. Iteration 4: b = 0 ^ 4 = 4. The loop terminates when a = 5. Prints 4.',
    optionExplanations: ['4 is the exact accumulated XOR value: (1 ^ 2 ^ 3 ^ 4) = 4.', '0 is intermediate state at iteration 3.', '10 is arithmetic sum (1+2+3+4), not bitwise XOR.', '7 is incorrect.'],
    concept: 'While Loop & XOR Accumulation',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-008',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Hard',
    question: `Consider the following recursive function:\n\nFunction solve(Integer n)\n  If (n <= 1) Return 1\n  Return n + solve(n - 2)\nEnd Function\n\nWhat will solve(6) return?`,
    options: ['13', '12', '15', '7'],
    correctAnswer: 0,
    explanation: 'solve(6) = 6 + solve(4) = 6 + 4 + solve(2) = 6 + 4 + 2 + solve(0). Since 0 <= 1, solve(0) returns 1. Total = 6 + 4 + 2 + 1 = 13.',
    optionExplanations: ['13 is correct: 6 + 4 + 2 + 1 = 13.', '12 misses the base case return value 1.', '15 assumes step is 1 instead of 2.', '7 is incorrect.'],
    concept: 'Recursive Call Stack Evaluation',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-009',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will be the output of the following pseudocode?\n\nInteger p, q, res\nSet p = 3, q = 2\nSet res = (p << q) | (p >> 1)\nPrint res`,
    options: ['13', '12', '15', '14'],
    correctAnswer: 0,
    explanation: 'p << q = 3 << 2 = 12 (binary 1100). p >> 1 = 3 >> 1 = 1 (binary 0001). 12 | 1 = 1100 | 0001 = 1101 = 13 in decimal.',
    optionExplanations: ['13 is correct: (3 << 2) = 12, (3 >> 1) = 1, 12 | 1 = 13.', '12 misses the OR term.', '15 assumes bitwise addition.', '14 is an arithmetic error.'],
    concept: 'Bitwise Shift & Bitwise OR',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-010',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Easy',
    question: `What will be the output of the following pseudocode?\n\nInteger x, y, z\nSet x = 15, y = 4, z = 2\nIf (x MOD y == 3)\n  z = z * x\nElse\n  z = z + y\nEnd If\nPrint z`,
    options: ['30', '6', '8', '60'],
    correctAnswer: 0,
    explanation: '15 MOD 4 equals 3, which satisfies the condition (3 == 3). Thus the If branch executes: z = 2 * 15 = 30.',
    optionExplanations: ['30 is correct: 15 % 4 == 3 is true, so z = 2 * 15 = 30.', '6 would be the result if Else branch executed (2 + 4).', '8 is incorrect.', '60 is 4 * 15.'],
    concept: 'Conditional Branches & Modulo Operator',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-011',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will the following pseudocode print?\n\nInteger total, i, j\nSet total = 0\nFor i = 1 to 3\n  For j = 1 to 4\n    If (j == 3) Break\n    total = total + j\n  End For\nEnd For\nPrint total`,
    options: ['9', '18', '30', '12'],
    correctAnswer: 0,
    explanation: 'For each iteration of outer loop i (1, 2, 3), the inner loop adds j=1 and j=2 (sum = 3). When j=3, Break exits the inner loop. 3 outer iterations * 3 = 9.',
    optionExplanations: ['9 is correct: each of 3 outer loops adds 1 + 2 = 3 before breaking at j=3. 3 * 3 = 9.', '18 assumes inner loop continues past break.', '30 is total without any break statement.', '12 assumes j=3 is also added.'],
    concept: 'Loop Control (Break Statement)',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-012',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Hard',
    question: `What will be the output of the following pseudocode?\n\nInteger arr[5] = {2, 4, 6, 8, 10}\nInteger i\nFor i = 1 to 4\n  arr[i] = arr[i] - arr[i - 1]\nEnd For\nPrint arr[3]`,
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    explanation: 'i=1: arr[1] = 4 - 2 = 2. i=2: arr[2] = 6 - arr[1] = 6 - 2 = 4. i=3: arr[3] = 8 - arr[2] = 8 - 4 = 4. Therefore, arr[3] is 4.',
    optionExplanations: ['4 is correct: sequential in-place difference evaluates arr[3] = 8 - 4 = 4.', '2 assumes static initial array values.', '6 is original arr[2].', '8 is original arr[3].'],
    concept: 'Array Sequential In-Place Mutation',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-013',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Easy',
    question: `What will the following pseudocode print for n = 16?\n\nInteger n\nSet n = 16\nIf ((n & (n - 1)) == 0 AND n > 0)\n  Print "POWER_OF_TWO"\nElse\n  Print "OTHER"\nEnd If`,
    options: ['POWER_OF_TWO', 'OTHER', '16', '0'],
    correctAnswer: 0,
    explanation: 'The bitwise trick n & (n - 1) checks if a number has only a single set bit. For 16 (10000 in binary), n - 1 = 15 (01111 in binary). 16 & 15 = 0. Hence prints POWER_OF_TWO.',
    optionExplanations: ['POWER_OF_TWO is correct: 16 & 15 == 0.', 'OTHER occurs for numbers that are not powers of two.', '16 is the variable value.', '0 is the bitwise expression result.'],
    concept: 'Power-of-Two Bitwise Idiom',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-014',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will be printed by the following pseudocode?\n\nInteger a, b\nSet a = 10, b = 25\na = a + b\nb = a - b\na = a - b\nPrint a, b`,
    options: ['25, 10', '10, 25', '35, 15', '0, 0'],
    correctAnswer: 0,
    explanation: 'Line 1: a becomes 10 + 25 = 35. Line 2: b becomes 35 - 25 = 10. Line 3: a becomes 35 - 10 = 25. Thus, the values of a and b are swapped: 25, 10.',
    optionExplanations: ['25, 10 is correct: arithmetic swap exchanges the values.', '10, 25 is the original unswapped order.', '35, 15 are intermediate values.', '0, 0 is incorrect.'],
    concept: 'Arithmetic Value Swap',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-015',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Easy',
    question: `What will the following pseudocode print?\n\nInteger count, k\nSet count = 0\nFor k = 5 to 25 step 5\n  count = count + k\nEnd For\nPrint count`,
    options: ['75', '60', '50', '80'],
    correctAnswer: 0,
    explanation: 'The loop iterates for k = 5, 10, 15, 20, 25. The sum count is 5 + 10 + 15 + 20 + 25 = 75.',
    optionExplanations: ['75 is correct: 5 + 10 + 15 + 20 + 25 = 75.', '60 misses the final iteration k=25.', '50 assumes step count excludes 25 and 5.', '80 is arithmetic error.'],
    concept: 'Stepped For-Loop Accumulation',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'pseudo-016',
    topic: 'Pseudocodes & Logic Tracing',
    difficulty: 'Medium',
    question: `What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 1, b = 0, c = 1\nBoolean flag\nSet flag = (a == 1 AND NOT (b == 1)) OR (b == 1 AND c == 1)\nIf (flag)\n  Print 100\nElse\n  Print 200\nEnd If`,
    options: ['100', '200', '1', '0'],
    correctAnswer: 0,
    explanation: 'Left operand: a == 1 is True; NOT(b == 1) is NOT(False) = True. True AND True = True. Since the left side of the OR is True, flag is True. Prints 100.',
    optionExplanations: ['100 is correct: the compound boolean expression evaluates to True.', '200 would only print if flag evaluated to False.', '1 is the boolean value not the printed string.', '0 is incorrect.'],
    concept: 'Compound Boolean Logic & Short-Circuit',
    source: 'Accenture Assessment Bank'
  },

  // --- MS Excel & Spreadsheets ---
  {
    id: 'excel-001',
    topic: 'MS Excel & Spreadsheets',
    difficulty: 'Easy',
    question: 'In MS Excel, what is the significance of the 4th argument in =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]) when set to FALSE?',
    options: [
      'It sorts the table array in descending order',
      'It specifies that an exact match is required',
      'It performs an approximate match based on closest value',
      'It ignores blank cells in the lookup column'
    ],
    correctAnswer: 1,
    explanation: 'In VLOOKUP, range_lookup = FALSE (or 0) instructs Excel to look for an exact match. If no exact match is found, the error #N/A is returned. TRUE (or 1) looks for an approximate match in a sorted table.',
    optionExplanations: [
      'VLOOKUP does not sort the table array.',
      'FALSE enforces an exact match lookup.',
      'Setting the argument to TRUE performs an approximate match.',
      'Blank cells are not ignored by setting range_lookup to FALSE.'
    ],
    concept: 'VLOOKUP Exact vs Approximate Matching',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'excel-002',
    topic: 'MS Excel & Spreadsheets',
    difficulty: 'Medium',
    question: 'If cell C1 contains the formula =$A$1 + B1 and this formula is copied and pasted into cell E3, what will the formula become in cell E3?',
    options: [
      '=$A$1 + D3',
      '=$C$3 + D3',
      '=$A$1 + B1',
      '=$C$1 + B3'
    ],
    correctAnswer: 0,
    explanation: '$A$1 is an absolute reference ($ before both column and row), so it remains unchanged regardless of where it is copied. B1 is a relative reference: copying from C1 to E3 is moving 2 columns right (C to E) and 2 rows down (row 1 to 3), so B1 becomes D3. Thus, the formula becomes =$A$1 + D3.',
    optionExplanations: [
      '=$A$1 + D3 is correct: absolute reference $A$1 is locked, relative reference B1 shifts 2 cols right and 2 rows down to D3.',
      '=$C$3 + D3 incorrectly changes the locked $A$1 reference.',
      '=$A$1 + B1 assumes both references are absolute.',
      '=$C$1 + B3 incorrectly computes the relative offsets.'
    ],
    concept: 'Absolute vs Relative Cell Referencing',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'excel-003',
    topic: 'MS Excel & Spreadsheets',
    difficulty: 'Easy',
    question: 'Which Excel formula correctly calculates the sum of cells in range D2:D20 only if the corresponding cell in C2:C20 contains "Delivered"?',
    options: [
      '=COUNTIF(C2:C20, "Delivered", D2:D20)',
      '=SUMIF(C2:C20, "Delivered", D2:D20)',
      '=SUM(C2:C20="Delivered", D2:D20)',
      '=TOTALIF("Delivered", C2:C20, D2:D20)'
    ],
    correctAnswer: 1,
    explanation: 'The syntax for SUMIF is =SUMIF(range, criteria, [sum_range]). Here, C2:C20 is the evaluation range, "Delivered" is the criterion, and D2:D20 is the range containing numbers to sum.',
    optionExplanations: [
      'COUNTIF only counts cells and does not take a sum_range argument.',
      '=SUMIF(C2:C20, "Delivered", D2:D20) is the correct standard syntax.',
      'SUM cannot take a conditional equality string in standard Excel syntax.',
      'TOTALIF is not a valid built-in Microsoft Excel formula.'
    ],
    concept: 'SUMIF Conditional Calculations',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'excel-004',
    topic: 'MS Excel & Spreadsheets',
    difficulty: 'Hard',
    question: 'What error code does MS Excel display when a formula refers to a cell that has been deleted or is invalid?',
    options: [
      '#VALUE!',
      '#NAME?',
      '#REF!',
      '#NULL!'
    ],
    correctAnswer: 2,
    explanation: '#REF! (Reference Error) occurs when a formula contains an invalid cell reference, typically caused by deleting rows, columns, or worksheets referenced in the formula.',
    optionExplanations: [
      '#VALUE! occurs when the wrong type of argument or operand is used (e.g. adding text to a number).',
      '#NAME? appears when Excel does not recognize text in a formula (e.g., misspelled function name).',
      '#REF! is displayed when an invalid or deleted cell reference is encountered.',
      '#NULL! occurs when specifying an intersection of two areas that do not intersect.'
    ],
    concept: 'Excel Error Codes & Troubleshooting',
    source: 'Accenture Assessment Bank'
  },

  // --- MS Office & Common Applications ---
  {
    id: 'office-001',
    topic: 'MS Office & Common Applications',
    difficulty: 'Easy',
    question: 'In Microsoft PowerPoint, what is the primary purpose of the "Slide Master" feature?',
    options: [
      'To play slide show presentations in kiosk mode automatically',
      'To record audio voiceovers and rehearse timings for presentations',
      'To globally customize default fonts, themes, logos, and placeholders across all slides',
      'To compress all embedded images and media files in the deck'
    ],
    correctAnswer: 2,
    explanation: 'The Slide Master is the top slide in a presentation hierarchy that stores information about the theme, layout, backgrounds, colors, fonts, and placeholders across all slides in the deck.',
    optionExplanations: [
      'Kiosk mode is configured in Set Up Slide Show, not Slide Master.',
      'Voiceover and timing rehearsals are managed in Rehearse Timings.',
      'Slide Master provides global design consistency across all slide layouts.',
      'Media compression is handled via File > Info > Compress Media.'
    ],
    concept: 'PowerPoint Slide Master',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'office-002',
    topic: 'MS Office & Common Applications',
    difficulty: 'Medium',
    question: 'In Microsoft Word, what two primary components are required to execute a Mail Merge operation?',
    options: [
      'A Template document and an Excel Macro script',
      'A Main Document (form letter/envelope) and a Data Source (recipient list/spreadsheet)',
      'An XML Schema and a VBA Add-in',
      'An Outline layout and a Bibliography citation file'
    ],
    correctAnswer: 1,
    explanation: 'Mail Merge requires a Main Document (containing common text and merge fields) and a Data Source (e.g., an Excel workbook, Access database, or Outlook Contacts list containing individual recipient details).',
    optionExplanations: [
      'Mail Merge is native and does not require custom VBA macros.',
      'Main Document + Data Source are the two foundational elements of Mail Merge.',
      'XML schemas are not required for standard Mail Merge.',
      'Outlines and Bibliographies are unrelated Word document features.'
    ],
    concept: 'Word Mail Merge Architecture',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'office-003',
    topic: 'MS Office & Common Applications',
    difficulty: 'Easy',
    question: 'What is the universal keyboard shortcut to open the "Find and Replace" dialog in Microsoft Word, Excel, and PowerPoint?',
    options: [
      'Ctrl + F',
      'Ctrl + H',
      'Ctrl + R',
      'Ctrl + K'
    ],
    correctAnswer: 1,
    explanation: 'Ctrl + H directly opens the Find and Replace dialog across Microsoft Office applications. (Ctrl + F opens Find / Navigation, Ctrl + K inserts a hyperlink, and Ctrl + R right-aligns text).',
    optionExplanations: [
      'Ctrl + F opens the Find pane, whereas Ctrl + H directly launches the Replace tab.',
      'Ctrl + H is the universal shortcut for Find and Replace.',
      'Ctrl + R right-aligns selected text or fills right in Excel.',
      'Ctrl + K opens the Insert Hyperlink dialog.'
    ],
    concept: 'Office Productivity Keyboard Shortcuts',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'office-004',
    topic: 'MS Office & Common Applications',
    difficulty: 'Medium',
    question: 'In Microsoft Outlook, which email protocol keeps messages synchronized with the mail server across multiple devices?',
    options: [
      'POP3 (Post Office Protocol 3)',
      'SMTP (Simple Mail Transfer Protocol)',
      'IMAP (Internet Message Access Protocol)',
      'SNMP (Simple Network Management Protocol)'
    ],
    correctAnswer: 2,
    explanation: 'IMAP (Internet Message Access Protocol) stores email messages on a mail server and enables multi-device synchronization of folders, read status, and drafts. POP3 typically downloads emails and deletes them from the server.',
    optionExplanations: [
      'POP3 downloads emails to a single device and does not provide multi-device sync.',
      'SMTP is used exclusively for transmitting/sending outbound emails.',
      'IMAP provides two-way folder and message synchronization with the server.',
      'SNMP is a network hardware monitoring protocol, not an email protocol.'
    ],
    concept: 'Email Protocols in Outlook',
    source: 'Accenture Assessment Bank'
  },

  // --- Network Security ---
  {
    id: 'netsec-001',
    topic: 'Network Security',
    difficulty: 'Medium',
    question: 'What is the principal difference between a Packet Filtering Firewall and a Stateful Inspection Firewall?',
    options: [
      'Packet filtering firewalls operate only on Layer 7 application data',
      'Stateful inspection tracks active connection state and validates packets against an active session table',
      'Packet filtering decrypts SSL/TLS payloads whereas stateful inspection cannot',
      'Stateful inspection only inspects the destination IP address of incoming packets'
    ],
    correctAnswer: 1,
    explanation: 'A Packet Filtering Firewall inspects each packet in isolation (checking source/destination IP and port). A Stateful Inspection Firewall tracks the state of active network connections in a state table, ensuring incoming packets belong to established, legitimate flows.',
    optionExplanations: [
      'Packet filtering operates at Layers 3 and 4 (Network & Transport), not Layer 7.',
      'Stateful inspection maintains a state table to verify packets in the context of active sessions.',
      'Neither basic packet filtering nor basic stateful inspection decrypts TLS payloads without proxying.',
      'Stateful inspection examines multiple header fields, flags, and connection states, not just destination IP.'
    ],
    concept: 'Firewall Architectures',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'netsec-002',
    topic: 'Network Security',
    difficulty: 'Hard',
    question: 'In an ARP Spoofing (ARP Poisoning) attack on a local subnet, what does the attacker send to deceive victim hosts?',
    options: [
      'Forged DNS response records mapping domain names to an attacker IP',
      'Gratuitous ARP replies associating the attacker\'s MAC address with the default gateway\'s IP address',
      'Malformed TCP SYN packets with randomized source port numbers to trigger a crash',
      'ICMP Echo requests containing high-entropy encrypted payloads'
    ],
    correctAnswer: 1,
    explanation: 'ARP Poisoning exploits the lack of authentication in ARP by broadcasting gratuitous ARP replies that link the attacker\'s MAC address to the IP address of the router/gateway, redirecting subnet traffic through the attacker (Man-in-the-Middle).',
    optionExplanations: [
      'Forged DNS responses represent DNS Cache Poisoning, not ARP spoofing.',
      'Gratuitous ARP replies overwrite the victim\'s ARP cache with the attacker\'s MAC address.',
      'Randomized TCP SYN packets describe a SYN flood DoS attack.',
      'ICMP echo requests with large payloads relate to Ping of Death / Smurf attacks.'
    ],
    concept: 'ARP Spoofing & Layer 2 Security',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'netsec-003',
    topic: 'Network Security',
    difficulty: 'Easy',
    question: 'Which of the following cryptographic algorithms is an Asymmetric (Public Key) cipher?',
    options: [
      'AES (Advanced Encryption Standard)',
      'DES (Data Encryption Standard)',
      'RSA (Rivest-Shamir-Adleman)',
      'Blowfish'
    ],
    correctAnswer: 2,
    explanation: 'RSA is an asymmetric cipher that relies on a key pair (public key for encryption, private key for decryption) based on the mathematical difficulty of factoring large composite prime numbers. AES, DES, and Blowfish are symmetric ciphers.',
    optionExplanations: [
      'AES is a symmetric block cipher using a single shared secret key.',
      'DES is an older symmetric block cipher with a 56-bit key.',
      'RSA is a widely used asymmetric public-key cryptosystem.',
      'Blowfish is a symmetric block cipher created by Bruce Schneier.'
    ],
    concept: 'Symmetric vs Asymmetric Cryptography',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'netsec-004',
    topic: 'Network Security',
    difficulty: 'Medium',
    question: 'What happens during the TLS/SSL Handshake between a web browser and an HTTPS server?',
    options: [
      'The client and server authenticate each other and negotiate a symmetric session key for fast data encryption',
      'The server immediately transmits all webpage HTML in plaintext before certificate verification',
      'The client generates a permanent private key and permanently sends it to the server',
      'The server disables its local firewall for all traffic on port 443'
    ],
    correctAnswer: 0,
    explanation: 'The TLS handshake validates the server\'s digital certificate (via a CA), negotiates cipher suites, and securely derives a symmetric session key used to encrypt subsequent data with high performance.',
    optionExplanations: [
      'TLS handshakes authenticate the server and derive a shared symmetric session key for efficient bulk encryption.',
      'No plaintext web payload is sent prior to establishing the encrypted tunnel.',
      'Private keys are NEVER transmitted across the network.',
      'Firewalls are not disabled; port 443 allows established TLS connections.'
    ],
    concept: 'TLS Handshake & Hybrid Cryptography',
    source: 'Accenture Assessment Bank'
  },

  // --- Cloud Computing & Architecture ---
  {
    id: 'cloud-001',
    topic: 'Cloud Computing & Architecture',
    difficulty: 'Easy',
    question: 'In cloud computing, what layer of the stack is managed by the customer in an Infrastructure as a Service (IaaS) model (e.g., AWS EC2, Azure VM)?',
    options: [
      'Physical data center facilities, cooling, and server racks',
      'Hypervisors, physical host servers, and underlying network routers',
      'Guest Operating System, runtime environments, middleware, and application code',
      'Only the end-user browser settings and client cookies'
    ],
    correctAnswer: 2,
    explanation: 'In the Cloud Shared Responsibility Model for IaaS, the cloud provider manages physical hardware, facilities, and virtualization. The customer is responsible for configuring, patching, and securing the guest OS, runtime, middleware, data, and applications.',
    optionExplanations: [
      'Physical facilities and hardware are managed solely by the cloud provider.',
      'Hypervisors and host physical servers are maintained by the cloud provider.',
      'The customer controls and manages the OS, runtime, and software deployed on the VM.',
      'Client settings are on user devices, not part of the cloud service stack.'
    ],
    concept: 'IaaS Shared Responsibility Model',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'cloud-002',
    topic: 'Cloud Computing & Architecture',
    difficulty: 'Medium',
    question: 'What is the primary difference between a Type 1 (Bare-Metal) Hypervisor and a Type 2 (Hosted) Hypervisor?',
    options: [
      'Type 1 runs directly on the host physical hardware without an underlying host OS; Type 2 runs on top of a host OS',
      'Type 1 is only for personal desktop computers; Type 2 is for enterprise data centers',
      'Type 1 requires an internet connection; Type 2 operates offline only',
      'Type 1 cannot run multiple guest virtual machines concurrently'
    ],
    correctAnswer: 0,
    explanation: 'Type 1 hypervisors (e.g., VMware ESXi, Microsoft Hyper-V, KVM) run directly on physical server hardware, delivering high performance and low latency. Type 2 hypervisors (e.g., VirtualBox, VMware Workstation) run as an application on top of an existing host operating system.',
    optionExplanations: [
      'Type 1 is bare-metal (runs directly on hardware); Type 2 runs on top of a host OS.',
      'Type 1 is the standard for enterprise data centers due to performance and isolation.',
      'Internet connectivity is not the distinguishing factor for hypervisor architecture.',
      'Both hypervisor types support concurrent execution of multiple virtual machines.'
    ],
    concept: 'Virtualization & Hypervisor Types',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'cloud-003',
    topic: 'Cloud Computing & Architecture',
    difficulty: 'Medium',
    question: 'Which cloud computing deployment model combines an organization\'s on-premises private infrastructure with one or more public cloud services?',
    options: [
      'Community Cloud',
      'Hybrid Cloud',
      'Multi-tenant Monolithic Cloud',
      'Edge Gateway Cloud'
    ],
    correctAnswer: 1,
    explanation: 'Hybrid Cloud is a solution that blends on-premises infrastructure (or private cloud) with public cloud services, allowing data and apps to be shared between them to achieve scalability, compliance, and disaster recovery.',
    optionExplanations: [
      'Community cloud is shared among multiple organizations with common compliance or regulatory goals.',
      'Hybrid Cloud integrates on-premises private resources with public cloud capacity.',
      'Multi-tenant refers to resource sharing among customers, not a deployment topology.',
      'Edge Gateway refers to localized processing at network perimeters.'
    ],
    concept: 'Cloud Deployment Models',
    source: 'Accenture Assessment Bank'
  },
  {
    id: 'cloud-004',
    topic: 'Cloud Computing & Architecture',
    difficulty: 'Hard',
    question: 'In Amazon Web Services (AWS) and Microsoft Azure, what is the role of a VPC (Virtual Private Cloud) or VNet?',
    options: [
      'It is an unlimited object storage bucket for static website hosting',
      'It is a logically isolated virtual network dedicated to your cloud account where you define subnets, route tables, and gateways',
      'It is a distributed DNS service that maps human-readable domain names to IP addresses',
      'It is an automated billing tracker that cancels subscriptions upon credit limit breach'
    ],
    correctAnswer: 1,
    explanation: 'An AWS VPC / Azure VNet is a logically isolated section of the cloud where you launch resources in a virtual network that you define. You retain complete control over IP address ranges, subnets, route tables, and network gateways.',
    optionExplanations: [
      'Object storage is AWS S3 or Azure Blob Storage, not VPC.',
      'VPC/VNet provides an isolated virtual network environment with customizable subnets and routing.',
      'DNS services are handled by AWS Route 53 or Azure DNS.',
      'Billing alerts are handled by CloudWatch or Azure Cost Management.'
    ],
    concept: 'VPC & Cloud Networking Isolation',
    source: 'Accenture Assessment Bank'
  }
];

/**
 * Returns fallback questions for a given topic and difficulty.
 * If topic not found or pool exhausted, samples from the broader bank.
 */
export function getLocalFallbackQuestions(topicName, difficulty = 'Mixed', count = 10) {
  let filtered = MCQ_FALLBACK_BANK;

  if (topicName && topicName !== 'Mixed CS Fundamentals') {
    const topicFiltered = MCQ_FALLBACK_BANK.filter(
      q => q.topic.toLowerCase().includes(topicName.toLowerCase()) ||
           topicName.toLowerCase().includes(q.topic.toLowerCase())
    );
    if (topicFiltered.length > 0) {
      filtered = topicFiltered;
    }
  }

  if (difficulty && difficulty !== 'Mixed') {
    const diffFiltered = filtered.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    if (diffFiltered.length > 0) {
      filtered = diffFiltered;
    }
  }

  // Shuffle pool
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  // If requested count exceeds available matching questions, pad with general questions
  if (shuffled.length < count) {
    const remaining = MCQ_FALLBACK_BANK.filter(q => !shuffled.some(s => s.id === q.id));
    shuffled.push(...remaining.sort(() => Math.random() - 0.5));
  }

  return shuffled.slice(0, count).map((q, idx) => ({
    ...q,
    id: q.id || `q-${idx}-${Date.now()}`
  }));
}
