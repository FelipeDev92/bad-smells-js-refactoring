import { ReportGenerator } from '../src/ReportGenerator.refactored.js';

const adminUser = { name: 'Admin', role: 'ADMIN' };
const standardUser = { name: 'User', role: 'USER' };

const testItems = [
  { id: 1, name: 'Produto A', value: 300 },
  { id: 2, name: 'Produto B', value: 700 },
  { id: 3, name: 'Produto C', value: 1200 },
];

describe('ReportGenerator (Rede de Segurança)', () => {
  let generator;

  beforeEach(() => {
    generator = new ReportGenerator({});
  });

  describe('Admin User', () => {
    it('deve gerar um relatório CSV completo para Admin', () => {
      const report = generator.generateReport('CSV', adminUser, JSON.parse(JSON.stringify(testItems)));
      expect(report).toContain('ID,NOME,VALOR,USUARIO');
      expect(report).toContain('1,Produto A,300,Admin');
      expect(report).toContain('2,Produto B,700,Admin');
      expect(report).toContain('3,Produto C,1200,Admin');
    });

    it('deve gerar um relatório HTML completo para Admin (com prioridade)', () => {
      const report = generator.generateReport('HTML', adminUser, JSON.parse(JSON.stringify(testItems)));
      expect(report).toContain('<h1>Relatório</h1>');
      expect(report).toContain('<h2>Usuário: Admin</h2>');
      expect(report).toContain('<tr><td>1</td><td>Produto A</td><td>300</td></tr>');
    });
  });

  describe('Standard User', () => {
    it('deve gerar um relatório CSV filtrado para User (apenas itens <= 500)', () => {
      const report = generator.generateReport('CSV', standardUser, JSON.parse(JSON.stringify(testItems)));
      expect(report).toContain('ID,NOME,VALOR,USUARIO');
      expect(report).toContain('1,Produto A,300,User');
    });
  });
});