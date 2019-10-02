# Generated by Django 2.0.7 on 2019-09-22 06:11

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
                ('info', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=50)),
                ('amount', models.IntegerField(default=0)),
                ('price', models.FloatField(default=0)),
                ('info', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=50)),
                ('price', models.FloatField(default=0)),
                ('amount', models.IntegerField(default=0)),
                ('detail', models.CharField(max_length=100)),
                ('info', django.contrib.postgres.fields.jsonb.JSONField(default={})),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apps.Company')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apps.Product'),
        ),
    ]