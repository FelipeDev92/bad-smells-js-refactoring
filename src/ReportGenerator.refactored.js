export class ReportGenerator {
  constructor(database) {
    this.db = database;
  }

  generateReport(reportType, user, items) {

    const filteredItems = this._filterItemsByUser(user, items);
    
    const total = this._calculateTotal(filteredItems);

    if (reportType === 'CSV') {
      return this._generateCSV(user, filteredItems, total);
    }
    if (reportType === 'HTML') {
      return this._generateHTML(user, filteredItems, total);
    }
    
    return '';
  }

  _filterItemsByUser(user, items) {
    return items.filter(item => {
      if (user.role === 'ADMIN') {
        if (item.value > 1000) item.priority = true;
        return true;
      }
      return user.role === 'USER' && item.value <= 500;
    });
  }

  _calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.value, 0);
  }

  _generateCSV(user, items, total) {
    let report = 'ID,NOME,VALOR,USUARIO\n';
    for (const item of items) {
      report += `${item.id},${item.name},${item.value},${user.name}\n`;
    }
    report += `\nTotal,,\n${total},,\n`;
    return report.trim();
  }

  _generateHTML(user, items, total) {
    let report = '<html><body>\n<h1>Relatório</h1>\n';
    report += `<h2>Usuário: ${user.name}</h2>\n<table>\n`;
    report += '<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>\n';

    for (const item of items) {
      const trTag = item.priority ? '<tr style="font-weight:bold;">' : '<tr>';
      report += `${trTag}<td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
    }

    report += `</table>\n<h3>Total: ${total}</h3>\n</body></html>`;
    return report.trim();
  }
}