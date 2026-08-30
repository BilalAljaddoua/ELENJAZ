(function(){
  const D=window.BUSINESS_DATA;
  const form=document.getElementById('bookingForm');
  const brandSelect=document.getElementById('brandSelect');
  const serviceSelect=document.getElementById('serviceSelect');
  const dateInput=document.getElementById('bookingDate');
  const note=document.getElementById('formNote');
  if(!D||!form)return;

  D.brands.forEach(brand=>brandSelect.add(new Option(brand.name,brand.name)));
  brandSelect.add(new Option('أخرى ألمانية أو أوروبية','أخرى ألمانية أو أوروبية'));
  D.services.forEach(service=>serviceSelect.add(new Option(service.ar,service.ar)));

  const today=new Date();
  const localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  dateInput.min=localDate;

  const requestedService=new URLSearchParams(location.search).get('service');
  const selected=D.services.find(service=>service.id===requestedService);
  if(selected)serviceSelect.value=selected.ar;

  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const value=name=>String(data.get(name)||'—').trim()||'—';
    const message=`السلام عليكم، أرغب بحجز موعد صيانة لدى مركز الإنجاز.

بيانات العميل
الاسم: ${value('name')}
رقم الجوال: ${value('phone')}

بيانات السيارة
الماركة: ${value('brand')}
الموديل: ${value('model')}
سنة الصنع: ${value('year')}
رقم اللوحة أو الهيكل: ${value('vehicleId')}

تفاصيل الموعد
الخدمة المطلوبة: ${value('service')}
وصف المشكلة: ${value('issue')}
التاريخ المفضل: ${value('date')}
الوقت المفضل: ${value('time')}`;
    const url=`https://wa.me/${D.phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
    note.textContent='تم تجهيز طلبك — جارٍ فتح واتساب…';
    window.open(url,'_blank','noopener');
  });

  document.getElementById('yearNow').textContent=new Date().getFullYear();
})();
