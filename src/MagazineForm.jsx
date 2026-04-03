import { useState } from 'react';

function MagazineForm({ onAdd, magazineToUpdate, onUpdate }) {
  // If editing, pre-fill the form; slice to "YYYY-MM-DDTHH:MM" for datetime-local input
  const formatForInput = (dateStr) => {
    if (!dateStr) return '';
    // Spring LocalDateTime arrives as "2024-03-15T10:30:00" — trim seconds for input
    return dateStr.length > 16 ? dateStr.slice(0, 16) : dateStr;
  };

  const [title, setTitle]             = useState(magazineToUpdate?.title       ?? '');
  const [price, setPrice]             = useState(magazineToUpdate?.price       ?? '');
  const [orderQty, setOrderQty]       = useState(magazineToUpdate?.orderQty    ?? '');
  const [currentIssue, setCurrentIssue] = useState(
    formatForInput(magazineToUpdate?.currentIssue) ?? ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const magazineData = {
      title,
      price:        parseFloat(price),
      orderQty:     parseInt(orderQty),
      // Send back as ISO string — Spring will deserialize LocalDateTime correctly
      currentIssue: currentIssue ? new Date(currentIssue).toISOString().slice(0, 19) : null,
    };

    if (magazineToUpdate) {
      // Spread existing magazine to preserve id and any other fields
      onUpdate({ ...magazineToUpdate, ...magazineData });
    } else {
      onAdd(magazineData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{magazineToUpdate ? 'Update Magazine' : 'Add Magazine'}</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Order Qty:</label>
        <input
          type="number"
          value={orderQty}
          onChange={(e) => setOrderQty(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Current Issue:</label>
        {/* datetime-local gives "YYYY-MM-DDTHH:MM", compatible with Spring LocalDateTime */}
        <input
          type="datetime-local"
          value={currentIssue}
          onChange={(e) => setCurrentIssue(e.target.value)}
          required
        />
      </div>

      <button type="submit">
        {magazineToUpdate ? 'Update Magazine' : 'Add Magazine'}
      </button>
    </form>
  );
}

export default MagazineForm;
