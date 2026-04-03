function Magazine({ magazine, onDelete, onUpdate }) {
  // Spring sends LocalDateTime as an ISO string e.g. "2024-03-15T10:30:00"
  // We parse it safely and format it for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
  };

  return (
    <div className="card">
      <h3>{magazine.title}</h3>
      <p>Price: ${magazine.price?.toFixed(2)}</p>
      <p>Current Issue: {formatDate(magazine.currentIssue)}</p>
      <button onClick={() => onDelete(magazine.id)}>Delete</button>
      <button onClick={() => onUpdate(magazine)}>Update</button>
    </div>
  );
}

export default Magazine;
